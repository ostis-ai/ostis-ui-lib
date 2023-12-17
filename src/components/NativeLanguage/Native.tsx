import { ReactNode, useEffect, useMemo } from 'react';
import { useInfiniteScroll } from '@components/InfiniteScroll';

import { NativeElement } from "./components/NativeElement";
import { INativeNode } from './model';
import { NativeProvider, TOnAskQuestion } from "./NativeContext";
import { Inner, StyledScTag, Target } from './styled';
import { NativeSkeleton } from './components/NativeSkeleton';

const PAGE_SIZE = 25;

interface IProps {
  tree: INativeNode | null;
  scgUrl: string;
  isLoading?: boolean;
  question: number;
  renderRequestPanel?: (addr: number) => ReactNode;
  onAskQuestion: TOnAskQuestion;
  className?: string;
}

export const Native = ({ isLoading, tree, scgUrl, renderRequestPanel, onAskQuestion, question, className }: IProps) => {
  const { page, scrollRef, targetRef } = useInfiniteScroll({ total: tree?.children?.length || 1, pageSize: PAGE_SIZE });

  useEffect(() => {
    scrollRef.current?.scroll(0, 0);
  }, []);

  const partialTree = useMemo(() => {
    if (!tree) return null;
    return { ...tree, children: tree.children?.slice(0, page * PAGE_SIZE) };
  }, [tree, page]);

  return (
    <NativeProvider onAskQuestion={onAskQuestion} scgUrl={scgUrl}>
      <StyledScTag ref={scrollRef} addr={question} className={className}>
        <Inner>
          {isLoading && <NativeSkeleton />}
          {partialTree && !isLoading && <NativeElement tree={partialTree} isRoot />}
          {partialTree && renderRequestPanel && renderRequestPanel(partialTree.addr)}
          <Target ref={targetRef} />
        </Inner>
      </StyledScTag>
    </NativeProvider>
  );
};
