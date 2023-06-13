import styled, { css } from 'styled-components';

import { ScTag } from '../ScTag';

export type TAppearance = 'blue' | 'transparent';

export const StyledScTag = styled(ScTag)<{ appearance: TAppearance }>`
  font-size: 18px;
  line-height: 22px;

  cursor: pointer;

  ${({ appearance }) => {
    switch (appearance) {
      case 'blue':
        return css`
          color: #2a6496;

          &:hover {
            background-color: #cbd9f1;

            color: #23527c;
          }
        `;
      case 'transparent':
        return css`
          &:hover {
            color: #323232;
          }
        `;
      default:
        return '';
    }
  }}
`;
