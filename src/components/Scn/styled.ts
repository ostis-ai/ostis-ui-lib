import { ScTag } from '@components/ScTag';
import styled from 'styled-components';

export const StyledScTag = styled(ScTag)`
  margin-bottom: 16px;

  flex-grow: 1;

  padding-right: 6px;

  margin-right: 6px;

  cursor: auto;

  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;

    margin: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;

    background-color: #c0c0c0;

    margin: 8px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;

    background-color: transparent;
  }
`;

export const Inner = styled.div`
  position: relative;
`;

export const Target = styled.div`
  position: absolute;

  left: 0;
  bottom: 200px;
  height: 1px;
  width: 100%;
`;
