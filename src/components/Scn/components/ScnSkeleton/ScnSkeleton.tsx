import { memo } from 'react';
import { getRandomInt } from '@utils/getRandomInt';
import { nanoid } from 'nanoid';

import { Child, Item, RightSide, StyledSkeleton, Wrapper } from './styled';

interface ITree {
  id: string;
  isLink?: boolean;
  modifier?: string;
  children?: ITree[];
}

const initialTree: ITree = {
  id: nanoid(5),
  children: [
    {
      id: nanoid(5),
      modifier: nanoid(5),
      children: [{ id: nanoid(5) }],
    },
    {
      id: nanoid(5),
      modifier: nanoid(5),
      children: [{ id: nanoid(5) }, { id: nanoid(5), isLink: true }],
    },
    {
      id: nanoid(5),
      children: [{ id: nanoid(5) }],
    },
    {
      id: nanoid(5),
      children: [{ id: nanoid(5) }],
    },
    {
      id: nanoid(5),
      modifier: nanoid(5),
      children: [{ id: nanoid(5), isLink: true }, { id: nanoid(5) }, { id: nanoid(5) }],
    },
  ],
};

interface ISkeletonItemProps {
  tree: ITree;
}

const SkeletonItem = ({ tree }: ISkeletonItemProps) => (
  <Item>
    <StyledSkeleton isArc width={16} height={16} />
    <RightSide>
      {tree.modifier && <StyledSkeleton isMdifier width={getRandomInt(200, 400)} height={22} />}
      <Wrapper>
        {tree.children?.map((child) => (
          <Child key={child.id}>
            {(tree.children?.length || 0) > 1 && <StyledSkeleton isArc width={16} height={16} />}
            <StyledSkeleton width={`${getRandomInt(30, 80)}%`} height={child.isLink ? 70 : 22} />
          </Child>
        ))}
      </Wrapper>
    </RightSide>
  </Item>
);

const ScnSkeletonWrapper = () => (
  <Wrapper>
    <StyledSkeleton height={26} width={getRandomInt(250, 350)} />
    {initialTree.children?.map((child) => (
      <SkeletonItem key={child.id} tree={child} />
    ))}
  </Wrapper>
);

export const ScnSkeleton = memo(ScnSkeletonWrapper);
