import { Chip } from '@components/Chip';
import styled, { css } from 'styled-components';

export const ChipBox = styled.div`
  display: flex;
  max-width: 100%;
`;

export const OptionChipWrapper = styled.div<{ $vissible: boolean }>`
  display: flex;
  gap: 8px;
  max-width: 100%;

  ${({ $vissible }) =>
    !$vissible &&
    css`
      transition: all ease 0.15s;
      opacity: 0;
      pointer-events: none;
    `}
`;

export const StyledChip = styled(Chip)`
  max-width: fit-content;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const CounterChip = styled(Chip)<{ $vissible: boolean }>`
  /* opacity: ${({ $vissible }) => ($vissible ? 1 : 0)}; */
  /* transform: scale(${({ $vissible }) => ($vissible ? 1 : 0)}); */
  display: ${({ $vissible }) => ($vissible ? 'unset' : 'none')};
  /* transition: all ease 0.15s; */
`;

export const ContentTooltip = styled.div`
  max-width: 488px;
`;
