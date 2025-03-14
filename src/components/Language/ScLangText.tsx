import { ReactNode, useEffect, useState } from 'react';
import { useClient } from '@components/ClientProvider';
import { useScUtils } from '@components/ScUtils';
import { PseudoText } from '@components/Skeleton';
import { ScAddr, ScEventSubscriptionParams, ScEventType } from 'ts-sc-client';

import { useLanguage } from './useLanguage';

const defaultRenderText = (value: string) => value;

interface IProps {
  addrOrSystemId: number | string;
  defaultText?: string;
  loaderHeight?: number | string;
  loaderWidth?: number | string;
  renderText?: (text: string) => ReactNode;
  setIsLoad?: (val: boolean) => void;
}

export const ScLangText = ({
  addrOrSystemId,
  loaderHeight,
  loaderWidth,
  defaultText = '...',
  renderText = defaultRenderText,
  setIsLoad,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [changeContentEventId, setChangeContentEventId] = useState<number | null>(null);

  const lang = useLanguage();

  const client = useClient();

  const { getMainId, getSystemId, getMainIdLinkAddr, addrOrSystemIdAddr } = useScUtils();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const elementAddr = new ScAddr(await addrOrSystemIdAddr(addrOrSystemId));
      let text = await getMainId(elementAddr, lang);
      if (!text) {
        text = await getSystemId(elementAddr);
        if (!text)
          text = defaultText;
      }
      setText(String(text));
      setIsLoading(false);
    })();
  }, [addrOrSystemId, addrOrSystemIdAddr, getMainId, lang, defaultText]);

  useEffect(() => {
    (async () => {
      const nodeAddr = await addrOrSystemIdAddr(addrOrSystemId);
      const linkAddr = await getMainIdLinkAddr(new ScAddr(nodeAddr), lang);

      if (!linkAddr) return;

      const onActionFinished = async (subscribedAddr: ScAddr) => {
        const [newContent] = await client.getLinkContents([subscribedAddr]);
        setText(String(newContent.data));
      };

      const eventParams = new ScEventSubscriptionParams(linkAddr, ScEventType.BeforeChangeLinkContent, onActionFinished);

      const [{ id }] = await client.createElementaryEventSubscriptions(eventParams);
      setChangeContentEventId(id);
    })();
  }, [addrOrSystemId, addrOrSystemIdAddr, client, getMainIdLinkAddr, lang]);

  // TODO: Подумать, как сделать красивее. Можно создавать сразу несколько языков? Кажется, что слишком малекий кейс для такого решения
  // Проблем в том, что, если создать раздел под одник языком, потом переключиться на другой, то будет пустое имя
  // Тогда я отредактирую его, создав новую линку с новым языком. Но текущий наблюдатель за событием (выше) ничего о новом языке не знает
  // Так как ссылки еще не было на момент инициализации
  // Либо повторно делать инициализацию при появлении ссылки (кажется, неплохо)
  // Либо как то еще
  // useEffect(() => {
  //   (async () => {
  //     const nodeAddr = await addrOrSystemIdAddr(addrOrSystemId);

  //     const onActionFinished = async (subscibedAddr: ScAddr, arc: ScAddr, anotherAddr: ScAddr) => {
  //       const { nrelMainIdtf, ...rest } = await searchKeynodes('nrel_main_idtf', langToKeynode[lang]);
  //       const foundLang = rest[snakeToCamelCase(langToKeynode[lang])];

  //       const langAlias = '_lang';

  //       const template = new ScTemplate();

  //       template.quintuple(
  //         subscibedAddr,
  //         ScType.VarCommonArc,
  //         anotherAddr,
  //         ScType.VarPermPosArc,
  //         nrelMainIdtf,
  //       );
  //       template.triple([ScType.VarNodeClass, langAlias], ScType.VarPermPosArc, anotherAddr);

  //       const res = await client.searchByTemplate(template);
  //       if (!res.length) return;

  //       const langAddr = res[0].get(langAlias);

  //       if (langAddr.value !== foundLang.value) return;

  //       const [newContent] = await client.getLinkContents([anotherAddr]);
  //       setText(String(newContent.data));
  //     };

  //     const eventParams = new ScEventParams(new ScAddr(nodeAddr), ScEventType.AddOutgoingEdge, onActionFinished);

  //     const [{ id }] = await client.createElementaryEventSubscriptions(eventParams);
  //     setAddNewLangEventId(id);
  //   })();
  // }, [addrOrSystemId, addrOrSystemIdAddr, client, searchKeynodes, getMainIdLinkAddr, lang]);

  useEffect(() => {
    if (!changeContentEventId) return;

    return () => {
      client.destroyElementaryEventSubscriptions(changeContentEventId);
    };
  }, [client, changeContentEventId]);


  useEffect(() => {
    if (text) {
      setIsLoad && setIsLoad(false);
    }
  }, [text]);

  return (
    <>
      {!setIsLoad && isLoading && <PseudoText height={loaderHeight} width={loaderWidth} />}
      {!isLoading && renderText(text)}
    </>
  );
};
