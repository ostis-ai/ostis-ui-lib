import { FC, PropsWithChildren } from 'react';
import { IScnNode } from '@components/Scn';
import { ScType } from 'ts-sc-client';

import { ScLink } from '../ScLink';
import { ScnEdge } from '../ScnEdge';
import { ScnLink } from '../ScnLink';

import { KeywordLinkWrapper, LeftSide, StyledScnLink } from './styled';

interface INodeProps {
  tree: IScnNode;
}

const KeywordLinkNode: FC<INodeProps> = ({ tree }) => {
  const { addr } = tree;
  return (
    <>
      <StyledScnLink addr={addr} />
      <KeywordLinkWrapper>
        <LeftSide>=</LeftSide>
        <LinkNode tree={tree} />
      </KeywordLinkWrapper>
    </>
  );
};

// export const KeywordNode: FC<INodeProps> = ({ children, tree }) => {
export const KeywordNode = ({ children, tree }: PropsWithChildren<INodeProps>) => {
  const { addr, type } = tree;
  const scType = new ScType(type);

  const getComp = () => {
    if (scType.isEdge()) return <ScnEdge node={tree} />;
    if (scType.isLink()) return <KeywordLinkNode tree={tree} />;
    return <StyledScnLink addr={addr} />;
  };

  return (
    <>
      {getComp()}
      {children}
    </>
  );
};

export const LinkNode = ({ children, tree: { addr, content, contentType } }: PropsWithChildren<INodeProps>) => (
  <>
    <ScLink addr={addr} content={content} contentType={contentType} />
    {children}
  </>
);

export const EdgeNode = ({ children, tree }: PropsWithChildren<INodeProps>) => (
  <>
    <ScnEdge node={tree} />
    {children}
  </>
);

export const TupleNode = ({ children, tree }: PropsWithChildren<INodeProps>) => {
  if (!tree.children) return <ScnLink addr={tree.addr} />;
  return (
    <>
      &#123;
      {children}
      &#125;
    </>
  );
};

export const SimpleNode = ({ tree: { addr }, children }: PropsWithChildren<INodeProps>) => (
  <>
    <ScnLink addr={addr} />
    {children}
  </>
);
