import { forwardRef, useEffect, useRef, useState } from 'react';
import { getRandomInt } from '@utils/getRandomInt';
import { refSetter } from '@utils/refSetter';

import { StyledSkeleton, Wrapper } from './styled';
import { ILoaderInfo, IPseudoText } from './types';
import { normalizeSize } from './utils';

export const PseudoText = forwardRef<HTMLSpanElement, IPseudoText>(
  ({ width: propsWidth = `${getRandomInt(20, 60)}%`, height: propsHeight, className }, ref) => {
    const [loaderInfo, setLoaderInfo] = useState<ILoaderInfo | null>(null);

    const loaderRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (!loaderRef.current) return;
      const parent = loaderRef.current.parentElement;

      if (!parent) return;
      const { fontSize, lineHeight } = getComputedStyle(parent);
      setLoaderInfo({ fontSize, lineHeight });
    }, []);

    const height = normalizeSize(propsHeight);
    const targetHeight = height || loaderInfo?.fontSize;

    return (
      <Wrapper ref={refSetter(ref, loaderRef)} height={loaderInfo?.lineHeight}>
        &#8203;
        <StyledSkeleton className={className} width={propsWidth} height={targetHeight} />
      </Wrapper>
    );
  },
);

PseudoText.displayName = 'PseudoText';
