import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { useInView } from '@hooks/useInView';
import { refSetter } from '@utils/refSetter';

import { Inner, Target, Wrap } from './styled';

interface IProps {
  total: number;
  pageSize?: number;
  className?: string;
  triggerOffset?: string;
  initialPage?: number;
  renderElement: (ind: number) => ReactNode;
}

export const InfiniteScroll = ({
  className,
  total,
  pageSize = 5,
  triggerOffset = '20px',
  initialPage = 1,
  renderElement,
}: IProps) => {
  const [isInited, setIsInited] = useState(false);
  const [page, setPage] = useState(initialPage);

  const [targetRef, isInView, rootRef] = useInView<HTMLDivElement, HTMLDivElement>();

  const scrollRef = useRef<HTMLDivElement>(null);

  const length = Math.min(pageSize * page, total);
  const isOver = length === total;

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

  return (
    <>
      <Wrap className={className} ref={refSetter(scrollRef, rootRef)}>
        <Inner>
          {Array.from({ length }).map((_, ind) => (
            <Fragment key={ind}>{renderElement(ind)}</Fragment>
          ))}
          <Target ref={targetRef} bottom={triggerOffset} />
        </Inner>
      </Wrap>
    </>
  );
};
