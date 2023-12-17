import { FC, PropsWithChildren } from 'react';
import { IScnNode } from '@components/Scn/model';
import { ScType } from 'ts-sc-client';

import { ScLink } from '../ScLink';
import { NativeEdge } from '../NativeEdge';
import { NativeLink } from '../NativeLink';

import { KeywordLinkWrapper, LeftSide, StyledNativeLink } from './styled';

interface INodeProps {
  tree: IScnNode;
}

const KeywordLinkNode: FC<INodeProps> = ({ tree }) => {
  const { addr } = tree;
  return (
    <>
      <StyledNativeLink addr={addr} />
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
    if (scType.isEdge()) return <NativeEdge node={tree} />;
    if (scType.isLink()) return <KeywordLinkNode tree={tree} />;
    return <StyledNativeLink addr={addr} />;
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
    <NativeEdge node={tree} />
    {children}
  </>
);

export const TupleNode = ({ children, tree }: PropsWithChildren<INodeProps>) => {
  if (!tree.children) return <NativeLink addr={tree.addr} />;
  return (
    <>
      {children}
    </>
  );
};

export const SimpleNode = ({ tree: { addr }, children }: PropsWithChildren<INodeProps>) => (
  <>
    <NativeLink addr={addr} />
    {children}
  </>
);
