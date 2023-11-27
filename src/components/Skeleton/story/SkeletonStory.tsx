import { PseudoText } from '../PseudoText';

import { Wrapper } from './styled';

export const SkeletonStory = () => (
  <Wrapper>
    <PseudoText width="100%" height={50} />
    <PseudoText width="100%" height={100} />
    <PseudoText width="100%" height={24} />
    <PseudoText width="60%" height={24} />
    <PseudoText width="80%" height={24} />
  </Wrapper>
);
