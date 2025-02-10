import { Fragment, memo, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useClient } from '@components/ClientProvider';
import { useLanguage } from '@components/Language';
import { IScnNode } from '@components/Scn/model';
import { useScnContext } from '@components/Scn/ScnContext';
import { useScUtils } from '@components/ScUtils';
import { TScLanguageTab } from '@components/SwitchScgScn';
import { SPINER_COLOR } from '@model/constants';
import { langToKeynode } from '@utils/langToKeynode';
import { snakeToCamelCase } from '@utils/snakeToCamelCase';
import { ScAddr, ScTemplate, ScType } from 'ts-sc-client';

import { arcMap } from '../../constants';
import { EdgeNode, KeywordNode, LinkNode, SimpleNode, TupleNode } from '../Nodes';
import { ScnLink } from '../ScnLink';
import { Struct, StyledScg, StyledSpinner, StyledSwitchScgScn } from '../ScStruct/styled';

import { Arc, Child, LinkedNodes, Marker, Modifier, RightSide, StyledLinkedNode, Wrapper } from './styled';
import { getRandomInt } from '@utils/getRandomInt';

interface IProps {
  tree: IScnNode;
  isLoading?: boolean;
  isRoot?: boolean;
}

interface IModifierArcProps {
  type: number;
}

const ModifierArc = ({ type }: IModifierArcProps) => {
  const scType = new ScType(type);
  if (scType.isConst()) return <>:</>;
  return <>::</>;
};

const ScStruct = ({ tree }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<number | null>(null);
  const [tab, setTab] = useState<TScLanguageTab>('scn');

  const { onInitiateAction, scgUrl } = useScnContext();

  const getAction = useCallback(async () => {
    setIsLoading(true);
    const action = await onInitiateAction(tree.addr);
    setIsLoading(false);
    setAction(action);
  }, [onInitiateAction, tree.addr]);

  useEffect(() => {
    getAction();
  }, [getAction]);

  const showScg = tab === 'scg';
  const renderScg = showScg && !!action && !isLoading;
  return (
    <Struct isScg={showScg}>
      <StyledSwitchScgScn tab={tab} onTabClick={setTab} />
      {!showScg && <ScnElement tree={tree} isRoot />}
      <StyledScg url={scgUrl} action={action || undefined} show={renderScg} readonly />
      {showScg && isLoading && <StyledSpinner appearance={SPINER_COLOR} />}
    </Struct>
  );
};

interface ILinkedNodeProps {
  node: IScnNode;
  showMarker?: boolean;
}

const LinkedNode = ({ node, showMarker }: PropsWithChildren<ILinkedNodeProps>) => {
  const [show, setShow] = useState(true);

  const lang = useLanguage();
  const client = useClient();
  const { searchKeynodes } = useScUtils();

  const scType = new ScType(node.type);

  const isLink = scType.isLink();

  useEffect(() => {
    if (!isLink) return setShow(true);

    (async () => {
      const { languages, ...rest } = await searchKeynodes('languages', langToKeynode[lang]);

      const activeLangKeynode = rest[snakeToCamelCase(langToKeynode[lang])];

      const template = new ScTemplate();

      const langAlias = '_lang';

      template.triple(languages, ScType.VarPermPosArc, [ScType.VarNodeClass, langAlias]);
      template.triple(langAlias, ScType.VarPermPosArc, new ScAddr(node.addr));
      const result = await client.searchByTemplate(template);
      if (!result.length) return setShow(true);
      const foundLang = result[0].get(langAlias);
      setShow(foundLang.value === activeLangKeynode.value);
    })();
  }, [client, searchKeynodes, isLink, lang, node.addr]);

  if (!show) return null;

  return (
    <StyledLinkedNode>
      {showMarker && <Marker />}
      <ScnElement tree={node} />
    </StyledLinkedNode>
  );
};

const ScnElementWrapper = ({ tree, isRoot = false }: IProps) => {
  const { children, type, struct } = tree;
  const scType = new ScType(type);

  const getNode = () => {
    if (isRoot) return KeywordNode;
    if (scType.isLink()) return LinkNode;
    if (scType.isEdge()) return EdgeNode;
    if (scType.isTuple()) return TupleNode;
    return SimpleNode;
  };
  const Node = getNode();

  const isTuple = scType.isTuple();

  return (
    <Wrapper>
      <Node tree={tree}>
        {struct && (
          <Child>
            <Arc>=</Arc>
            <RightSide>
              <ScStruct tree={struct} />
            </RightSide>
          </Child>
        )}
        {children?.map(({ arcs: [arc], modifiers, linkedNodes }) => (
          <Child key={arc.addr}>
            {!isTuple && <Arc>{arcMap[arc.type]?.[arc.direction]}</Arc>}
            {isTuple && <Marker />}
            <RightSide>
              {modifiers && (
                <Modifier>
                  {modifiers.map((modifier) => (
                    <Fragment key={`${arc.addr}${modifier.addr}`}>
                      <ScnLink addr={modifier.addr} loaderHeight={18} loaderWidth={`${getRandomInt(20, 60)}%`} />
                      <ModifierArc type={modifier.modifierArcs[0].type} />
                    </Fragment>
                  ))}
                </Modifier>
              )}
              <LinkedNodes>
                {linkedNodes.map((linkedNode, linkedNodeInd) => (
                  <LinkedNode
                    key={`${linkedNode.addr}.${linkedNodeInd}`}
                    showMarker={linkedNodes.length > 1}
                    node={linkedNode}
                  />
                ))}
              </LinkedNodes>
            </RightSide>
          </Child>
        ))}
      </Node>
    </Wrapper>
  );
};

export const ScnElement = memo(ScnElementWrapper);
