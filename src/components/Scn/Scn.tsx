import { ReactNode, useEffect, useMemo } from 'react';
import { useInfiniteScroll } from '@components/InfiniteScroll';

import { ScnElement } from './components/ScnElement';
import { ScnSkeleton } from './components/ScnSkeleton';
import { IScnNode } from './model';
import { ScnProvider, TOnAskQuestion } from './ScnContext';
import { Inner, StyledScTag, Target } from './styled';

const PAGE_SIZE = 25;

interface IProps {
  tree: IScnNode | null;
  scgUrl: string;
  isLoading?: boolean;
  question: number;
  renderRequestPanel?: (addr: number) => ReactNode;
  onAskQuestion: TOnAskQuestion;
}

export const Scn = ({ isLoading, tree, scgUrl, renderRequestPanel, onAskQuestion, question }: IProps) => {
  const { page, scrollRef, targetRef } = useInfiniteScroll({ total: tree?.children?.length || 1, pageSize: PAGE_SIZE });

  useEffect(() => {
    scrollRef.current?.scroll(0, 0);
  }, []);

  const partialTree = useMemo(() => {
    if (!tree) return null;
    return { ...tree, children: tree.children?.slice(0, page * PAGE_SIZE) };
  }, [tree, page]);

  return (
    <ScnProvider onAskQuestion={onAskQuestion} scgUrl={scgUrl}>
      <StyledScTag ref={scrollRef} addr={question}>
        <Inner>
          {isLoading && <ScnSkeleton />}
          {partialTree && !isLoading && <ScnElement tree={partialTree} isRoot />}
          {partialTree && renderRequestPanel && renderRequestPanel(partialTree.addr)}

          <Target ref={targetRef} />
        </Inner>
      </StyledScTag>
    </ScnProvider>
  );
};
