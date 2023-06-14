import { IScnNode } from '@components/Scn';
import { getRandomInt } from '@utils/getRandomInt';

import { arcMap } from '../../constants';
import { ScnLink } from '../ScnLink';

import { EdgeInner, EdgeWrapper, StyledScTagLink } from './styled';

interface IProps {
  className?: string;
  node: IScnNode;
}

export const ScnEdge = ({ node: { addr, type, sourceNode, targetNode } }: IProps) => {
  if (!sourceNode || !targetNode) return null;

  return (
    <EdgeWrapper>
      &#40;
      <EdgeInner>
        <ScnLink addr={sourceNode.addr} loaderWidth={getRandomInt(40, 80)} />
        <StyledScTagLink addr={addr} forwardedAs="span">
          {arcMap[type].right}
        </StyledScTagLink>
        <ScnLink addr={targetNode.addr} loaderWidth={getRandomInt(40, 80)} />
      </EdgeInner>
      &#41;
    </EdgeWrapper>
  );
};
