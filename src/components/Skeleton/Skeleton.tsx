import { StyledSkeleton } from './styled';
import { ISkeleton } from './types';

export const Skeleton = ({ width: propsWidth, height: propsHeight, className }: ISkeleton) => {
  return <StyledSkeleton className={className} width={propsWidth} height={propsHeight} />;
};
