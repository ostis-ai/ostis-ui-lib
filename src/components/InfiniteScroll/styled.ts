import styled from 'styled-components';

type TStyledTarget = {
  bottom: string;
};

export const Wrap = styled.div`
  overflow: auto;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const Target = styled.div<TStyledTarget>`
  position: absolute;
  left: 0;
  height: 1px;
  width: 100%;
  background-color: gold;

  bottom: ${(props) => props.bottom};
`;
