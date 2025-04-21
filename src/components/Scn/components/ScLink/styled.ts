import styled, { css } from 'styled-components';

import { ScTag, ScTagLink } from '../../../ScTag';
import { ScnLink } from '../ScnLink';

export const StyledScTag = styled(ScTag)<{ $isHTML?: boolean }>`
  display: flex;
  gap: 2px;

  padding: 8px;

  font-size: 18px;
  line-height: 21px;
  color: #000000;

  ${(props) =>
    props.$isHTML &&
    css`
      display: block;

      p:first-of-type {
        margin-top: 0;
      }
    `}
`;

export const StyledScTagLink = styled(ScTagLink)`
  display: block;

  text-decoration: none;

  box-shadow: inset 0 0 0 1px #d8d8d8;

  background: linear-gradient(135deg, #d9d9d9 12px, transparent 12px);

  transition: all ease 0.15s;

  width: fit-content;

  word-break: break-word;

  &:hover {
    background-color: #ededed;

    opacity: 1;
  }

  &:active {
    box-shadow: inset 0 0 0 3px #d8d8d8;
  }
`;

export const StyledScnLink = styled(ScnLink)`
  display: inline;
`;
