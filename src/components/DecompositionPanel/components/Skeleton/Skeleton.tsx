import { PseudoText } from '@components/Skeleton';

import { BallWrapper, Root, Wrap } from './styled';

export const Skeleton = () => {
  return (
    <Root>
      <Wrap>
        <BallWrapper>
          <PseudoText width={24} height={24} />
        </BallWrapper>
        <PseudoText width="100%" height={24} />
      </Wrap>
      <Wrap>
        <BallWrapper>
          <PseudoText width={24} height={24} />
        </BallWrapper>
        <PseudoText width="60%" height={24} />
      </Wrap>
      <Wrap>
        <BallWrapper>
          <PseudoText width={24} height={24} />
        </BallWrapper>
        <PseudoText width="80%" height={24} />
      </Wrap>
    </Root>
  );
};
