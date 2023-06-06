import { useEffect, useState } from 'react';
import { useInView } from '@hooks/useInView';

interface IProps {
  total: number;
  pageSize?: number;
  initialPage?: number;
}

export const useInfiniteScroll = ({ total, pageSize = 5, initialPage = 1 }: IProps) => {
  const [isInited, setIsInited] = useState(false);
  const [page, setPage] = useState(initialPage);

  const [targetRef, isInView, scrollRef] = useInView<HTMLDivElement, HTMLDivElement>();

  const visibleElems = Math.min(pageSize * page, total);
  const isOver = visibleElems === total;

  useEffect(() => {
    if (!scrollRef.current) return;

    // Firefox scroll reset on page reload
    scrollRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    // continue loading firstMessages until target elem is visible
    if (isInited || isOver) return;

    const scrollElem = scrollRef.current;
    const targetElem = targetRef.current;
    if (!targetElem || !scrollElem) return;
    const isVisible = targetElem.offsetTop < scrollElem.offsetHeight;
    if (!isVisible) return setIsInited(true);

    setPage((prev) => prev + 1);
  }, [isOver, page, isInited]);

  useEffect(() => {
    if (!isInited || !isInView || isOver) return;
    setPage((prev) => prev + 1);
  }, [isInView, isOver, isInited]);

  return { page, scrollRef, targetRef };
};
