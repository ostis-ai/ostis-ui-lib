import { Skeleton } from '@components/Skeleton';
import styled, { css } from 'styled-components';

export const Item = styled.div`
  display: flex;
  gap: 4px;
`;

export const RightSide = styled.div`
  width: 100%;
`;

export const StyledSkeleton = styled(Skeleton)<{ isArc?: boolean; isMdifier?: boolean }>`
  ${({ isArc }) =>
    isArc &&
    css`
      flex-shrink: 0;

      margin-top: 4px;
    `}

  ${({ isMdifier }) =>
    isMdifier &&
    css`
      margin-bottom: 6px;
    `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Child = styled.div`
  display: flex;
  gap: 4px;
`;
