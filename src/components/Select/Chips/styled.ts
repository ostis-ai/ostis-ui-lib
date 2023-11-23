import { Chip } from '@components/Chip';
import styled from 'styled-components';

export const ChipBox = styled.div`
  display: flex;
  max-width: fit-content;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
export const CounterChipWrap = styled.div`
  display: flex;
  width: 35px;
  > * {
    width: 35px;
    border-radius: 8px;
    // Убирает действие inline-block
    display: flex;
  }
`;

export const ShadowCounterChip = styled.div`
  width: 35px;
  height: 24px;
`;

export const ChipsHintWrap = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledChip = styled(Chip)`
  margin-right: 4px;
  // Убирает пробел от inline-flex
  display: flex;
  max-width: fit-content;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const StyledCounterChip = styled(Chip)`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  align-items: center;

  width: 35px;
  padding: 4px 0;
`;

export const ContentTooltip = styled.div`
  max-width: 488px;
`;
