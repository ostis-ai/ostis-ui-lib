import { FC, memo, useEffect, useState } from 'react';
import { useClient } from '@components/ClientProvider';
import { useLanguage } from '@components/Language';
import { IScnNode } from '@components/Scn';
import { useScUtils } from '@components/ScUtils';
import { langToKeynode } from '@utils/langToKeynode';
import { snakeToCamelCase } from '@utils/snakeToCamelCase';
import { ScAddr, ScTemplate, ScType } from 'ts-sc-client';

import { ScnElement } from './ScnElement';
import { Marker, StyledLinkedNode } from './styled';

interface IProps {
  node: IScnNode;
  showMarker?: boolean;
}

const LinkedNodeWrapper: FC<IProps> = ({ node, showMarker }) => {
  const [show, setShow] = useState(true);

  const lang = useLanguage();
  const client = useClient();
  const { findKeynodes } = useScUtils();

  const scType = new ScType(node.type);

  const isLink = scType.isLink();

  useEffect(() => {
    if (!isLink) return setShow(true);

    (async () => {
      const { languages, ...rest } = await findKeynodes('languages', langToKeynode[lang]);

      const activeLangKeynode = rest[snakeToCamelCase(langToKeynode[lang])];

      const template = new ScTemplate();

      const langAlias = '_lang';

      template.triple(languages, ScType.EdgeAccessVarPosPerm, [ScType.NodeVarClass, langAlias]);
      template.triple(langAlias, ScType.EdgeAccessVarPosPerm, new ScAddr(node.addr));
      const result = await client.templateSearch(template);
      if (!result.length) return setShow(true);
      const foundLang = result[0].get(langAlias);
      setShow(foundLang.value === activeLangKeynode.value);
    })();
  }, [client, findKeynodes, isLink, lang, node.addr]);

  if (!show) return null;

  return (
    <StyledLinkedNode>
      {showMarker && <Marker />}
      <ScnElement tree={node} />
    </StyledLinkedNode>
  );
};

export const LinkedNode = memo(LinkedNodeWrapper);
