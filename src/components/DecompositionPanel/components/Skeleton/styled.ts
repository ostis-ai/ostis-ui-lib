import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  padding-top: 8px;
`;

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;
  grid-column-gap: 10px;
`;

export const BallWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
