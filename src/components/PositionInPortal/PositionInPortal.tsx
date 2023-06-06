import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { observeRect } from '@utils/observeRect';

import { Portal } from './styled';

interface IProps {
  targetRef: React.RefObject<HTMLElement>;
  relativeRef?: React.RefObject<HTMLElement>;
  container?: React.RefObject<HTMLDivElement>;
  fullContainerWidth?: boolean;
  className?: string;
}

export const PositionInPortal: FC<IProps> = ({
  targetRef,
  relativeRef,
  container,
  fullContainerWidth,
  className,
  ...props
}) => {
  const positionedPortalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = positionedPortalContainerRef.current;
    const relativeElement = relativeRef?.current;
    const relativeRect = relativeElement ? relativeElement.getBoundingClientRect() : { x: 0, y: 0 };
    if (node && targetRef.current) {
      const observer = observeRect(targetRef.current, (rect) => {
        if (rect) {
          const { x, y, height, width } = rect;
          const { style } = node;
          style.top = `${relativeRect.y + y}px`;
          style.left = fullContainerWidth ? '0px' : `${relativeRect.x + x}px`;
          style.height = `${height}px`;
          style.width = fullContainerWidth ? '100%' : `${width}px`;
        }
      });
      observer.observe();
      return () => {
        observer.unobserve();
      };
    }
  }, [fullContainerWidth]);

  return createPortal(
    <Portal className={className} ref={positionedPortalContainerRef} {...props} />,
    container?.current || document.body,
  );
};
