import { Fragment, memo } from 'react';
import { IScnNode } from '@components/Scn';
import { ScType } from 'ts-sc-client';

import { arcMap } from '../../constants';
import { EdgeNode, KeywordNode, LinkNode, SimpleNode, TupleNode } from '../Nodes';
import { ScnLink } from '../ScnLink';
import { ScStruct } from '../ScStruct';

import { LinkedNode } from './LinkedNode';
import { Arc, Child, LinkedNodes, Marker, Modifier, RightSide, Wrapper } from './styled';

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
        {children?.map(({ arcs: [arc], modifiers, linkedNodes }) => (
          <Child key={arc.addr}>
            {!isTuple && <Arc>{arcMap[arc.type]?.[arc.direction]}</Arc>}
            {isTuple && <Marker />}
            <RightSide>
              {modifiers && (
                <Modifier>
                  {modifiers.map((modifier) => (
                    <Fragment key={`${arc.addr}${modifier.addr}`}>
                      <ScnLink addr={modifier.addr} />
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
        {struct && (
          <Child>
            <Arc>=</Arc>
            <RightSide>
              <ScStruct tree={struct} />
            </RightSide>
          </Child>
        )}
      </Node>
    </Wrapper>
  );
};

export const ScnElement = memo(ScnElementWrapper);
