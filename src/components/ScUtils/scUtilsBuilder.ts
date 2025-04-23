import { TLanguage } from '@components/Language/types';
import { searchKeynodesBuilder } from '@utils/searchKeynodes';
import { langToKeynode } from '@utils/langToKeynode';
import { snakeToCamelCase } from '@utils/snakeToCamelCase';
import {
  ScAddr,
  ScClient,
  ScConstruction,
  ScEventSubscriptionParams,
  ScEventType,
  ScLinkContent,
  ScLinkContentType,
  ScTemplate,
  ScType,
} from 'ts-sc-client';

interface IProps {
  client: ScClient;
}

export const scUtilsBuilder = ({ client }: IProps) => {
  const searchKeynodes = searchKeynodesBuilder(client);

  const searchLanguages = async () => {
    const { languages } = await searchKeynodes("languages");

    const template = new ScTemplate();
    const languageAlias = '_language';

    template.triple(languages, ScType.VarPermPosArc, [ScType.NodeVar, languageAlias]);
    const searchResult = await client.searchByTemplate(template);
    return searchResult.map((result) => result.get(languageAlias));
  }
  interface MainIdCache {
    [key: string]: ScAddr | null;
  }

  const mainIdCache: MainIdCache = {};

  let initializationPromise: Promise<void> | null = null;
  const initializeMainIdCache = async () => {
    if (initializationPromise) {
      return initializationPromise;
    }

    initializationPromise = (async () => {
      try {
        const languages = await searchLanguages();
        // these keynodes have too many outgoing connectors so too frequent search for main identifier for them slows
        // down the queue of other client requests
        const keynodes = await searchKeynodes("lang_ru", "lang_en");
        await Promise.all(
          Object.entries(keynodes).map(async ([key, value]) => {
            for (const lang of languages) {
              const mainIdLink = await getMainIdLinkAddrWithoutCache(value, lang);
              if (!mainIdLink) continue;
              mainIdCache[`${value.value}_${lang.value}`] = mainIdLink;
            }
          })
        );
      } catch (error) {
        initializationPromise = null;
        throw error;
      }
    })();

    return initializationPromise;
  };

  const getMainIdLinkAddr = async (addr: ScAddr, lang: TLanguage) => {
    if (!initializationPromise) {
      await initializeMainIdCache();
    } else {
      await initializationPromise;
    }

    const language = await searchKeynodes(langToKeynode[lang]);
    const foundLang = language[snakeToCamelCase(langToKeynode[lang])];

    const cacheKey = `${addr.value}_${foundLang.value}`;

    if (Object.prototype.hasOwnProperty.call(mainIdCache, cacheKey)) {
      return mainIdCache[cacheKey];
    }

    return getMainIdLinkAddrWithoutCache(addr, foundLang);
  };

  const getMainIdLinkAddrWithoutCache = async (addr: ScAddr, lang: ScAddr) => {

    const { nrelMainIdtf } = await searchKeynodes('nrel_main_idtf');

    const template = new ScTemplate();
    const linkAlias = '_link';

    template.quintuple(
      addr,
      ScType.VarCommonArc,
      [ScType.VarNodeLink, linkAlias],
      ScType.VarPermPosArc,
      nrelMainIdtf,
    );
    template.triple(lang, ScType.VarPermPosArc, linkAlias);
    const result = await client.searchByTemplate(template);

    if (result.length) {
      return result[0].get(linkAlias);
    }
    return null;
  };


  const getMainId = async (addr: ScAddr, lang: TLanguage) => {
    const linkAddr = await getMainIdLinkAddr(addr, lang);

    if (linkAddr) {
      const contents = await client.getLinkContents([linkAddr]);
      return contents[0].data;
    }
    return null;
  };

  const getSystemId = async (addr: ScAddr) => {
    const { nrelSystemIdentifier } = await searchKeynodes('nrel_system_identifier');

    const template = new ScTemplate();
    const linkAlias = '_link';

    template.quintuple(
      addr,
      ScType.VarCommonArc,
      [ScType.VarNodeLink, linkAlias],
      ScType.VarPermPosArc,
      nrelSystemIdentifier,
    );
    const result = await client.searchByTemplate(template);

    if (result.length) {
      const contents = await client.getLinkContents([result[0].get(linkAlias)]);
      return String(contents[0].data);
    }
    return null;
  };

  const getId = async (addr: ScAddr, lang: TLanguage) => {
    const mainId = await getMainId(addr, lang);
    if (mainId) return String(mainId);
    const systemId = await getSystemId(addr);
    if (systemId) return String(systemId);
    return String(addr.value);
  };

  const addrOrSystemIdAddr = async (addrOrSystemId: string | number) => {
    const numericAddr = Number(addrOrSystemId);
    if (numericAddr) return numericAddr;
    const keynodes = await searchKeynodes(String(addrOrSystemId));
    return keynodes[snakeToCamelCase(String(addrOrSystemId))].value;
  };

  const getResult = (actionNode: ScAddr) => {
    return new Promise<ScAddr>((resolve) => {
      searchKeynodes('nrel_result').then(async ({ nrelResult }) => {
        const onActionFinished = async (_subscribedAddr: ScAddr, arc: ScAddr, anotherAddr: ScAddr, eventId: number) => {
          const template = new ScTemplate();
          template.triple(nrelResult, ScType.VarPermPosArc, arc);
          const isnrelResult = (await client.searchByTemplate(template)).length;
          if (!isnrelResult) return;
          client.destroyElementaryEventSubscriptions(eventId);
          resolve(anotherAddr);
        };

        const eventParams = new ScEventSubscriptionParams(actionNode, ScEventType.AfterGenerateOutgoingArc, onActionFinished);

        const [eventId] = await client.createElementaryEventSubscriptions(eventParams);

        const resultAlias = '_result';

        const template = new ScTemplate();
        template.quintuple(
          actionNode,
          ScType.VarCommonArc,
          [ScType.VarNode, resultAlias],
          ScType.VarPermPosArc,
          nrelResult,
        );
        const searchRes = await client.searchByTemplate(template);

        const result = searchRes[0]?.get(resultAlias);

        if (!result) return;

        client.destroyElementaryEventSubscriptions(eventId.id);
        resolve(result);
      });
    });
  };

  const generateLink = async (item: string) => {
    const constructionLink = new ScConstruction();
    constructionLink.generateLink(ScType.ConstNodeLink, new ScLinkContent(item, ScLinkContentType.String));

    const resultLinkNode = await client.generateElements(constructionLink);
    if (resultLinkNode.length) return resultLinkNode[0];
    return null;
  };

  return { searchKeynodes, getId, getMainIdLinkAddr, getMainId, getSystemId, addrOrSystemIdAddr, getResult, generateLink };
};
