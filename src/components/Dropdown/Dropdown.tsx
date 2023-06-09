import { forwardRef, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@hooks/useClickOutside';
import { useInterval } from '@hooks/useInterval';
import { refSetter } from '@utils/refSetter';

import { Container, FakeTarget, StyledPositionInPortal } from './styled';

const BOTTOM_HEIGHT = 68;
const HEADER_HEIGHT = 80;
const DROPDOWN_OFFSET = 2;

const defaultRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

type AlignItem = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onKeyDown'> {
  targetRef: React.RefObject<HTMLElement>;
  relativeRef?: React.RefObject<HTMLElement>;
  alignSelf?: AlignItem;
  container?: React.RefObject<HTMLDivElement>;
  onClickOutside?: (e: Event) => void;
}

export const Dropdown = forwardRef<HTMLDivElement, React.PropsWithChildren<DropdownProps>>(
  ({ targetRef, relativeRef, onClickOutside = () => null, className = '', ...props }, ref) => {
    const [display, setDisplay] = useState<'bottom' | 'top' | 'center'>('bottom');

    const checkDropdownPosition = () => {
      const containerNode = containerRef.current;
      const targetNode = targetRef.current;
      if (!containerNode || !targetNode) return;
      const containerRect = containerNode.getBoundingClientRect();
      const targetRect = targetNode.getBoundingClientRect();
      const reltiveRect = relativeRef?.current?.getBoundingClientRect() || defaultRect;

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const mayPlaceBottom =
        targetRect.bottom + reltiveRect.top + DROPDOWN_OFFSET + containerRect.height + BOTTOM_HEIGHT < viewportHeight;
      const mayPlaceTop = DROPDOWN_OFFSET + containerRect.height + HEADER_HEIGHT < targetRect.top + reltiveRect.top;

      if (mayPlaceBottom) setDisplay('bottom');
      else if (mayPlaceTop) setDisplay('top');
      else setDisplay('center');
      // TODO: Add a check if the element is too big and doesn't fit on top or bottom

      const conteinerWidth = containerRect.right - containerRect.left;

      if (targetRect.right < conteinerWidth && viewportWidth - targetRect.left < conteinerWidth) {
        containerNode.style.alignSelf = 'center';
      } else if (targetRect.right - 16 >= conteinerWidth && viewportWidth - targetRect.left >= conteinerWidth) {
        containerNode.style.alignSelf = '';
      } else if (targetRect.right - 16 < conteinerWidth) {
        containerNode.style.alignSelf = 'flex-start';
      } else if (viewportWidth - targetRect.left < conteinerWidth) {
        containerNode.style.alignSelf = 'flex-end';
      }
    };

    useInterval(checkDropdownPosition, 100);

    // First container render always happens downward and transparent,
    // after size and position settled transparency returns to normal
    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
    }, []);

    const containerRef = useRef<HTMLDivElement | null>(null);

    useClickOutside([containerRef], onClickOutside);

    return (
      <StyledPositionInPortal
        display={display}
        targetRef={targetRef}
        relativeRef={relativeRef}
        container={props.container}
      >
        <FakeTarget />
        <Container className={className} display={display || 'center'} ref={refSetter(ref, containerRef)} {...props} />
      </StyledPositionInPortal>
    );
  },
);

Dropdown.displayName = 'Dropdown';
