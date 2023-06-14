import styled from 'styled-components';

export const StyledLinkedNode = styled.div`
  display: flex;
`;

export const Marker = styled.div`
  flex-shrink: 0;

  width: 8px;
  height: 8px;

  border-radius: 50%;

  background-color: #2a6496;

  margin-right: 15px;
  margin-top: 6px;
`;

export const Wrapper = styled.div`
  font-family: 'Roboto';

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-grow: 1;
`;

export const Child = styled.div`
  display: flex;

  width: 100%;
`;

export const Arc = styled.div`
  width: 20px;

  color: #2a6496;

  flex-shrink: 0;
  align-self: flex-start;

  font-family: 'Unicode Symbols', 'Times New Roman', 'Apple Symbols', 'Arial Unicode MS';
`;

export const RightSide = styled.div`
  flex-grow: 1;
`;

export const Modifier = styled.div`
  display: flex;
  align-items: center;
  
  margin-bottom: 6px;
`;

export const LinkedNodes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
