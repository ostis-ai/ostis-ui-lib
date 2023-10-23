import { ButtonWithIcon } from '@components/ButtonWithIcon';
import { ScTagLink } from '@components/ScTag';
import styled, { css, keyframes } from 'styled-components';

import ArrowIcon from '../../icons/arrow.svg';

export const rotate = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.6;
  }
`;

export const ItemContentWrapper = styled.div<{ isOptionsOpen: boolean; isLoading: boolean }>`
  display: grid;
  grid-template-columns: 26px 1fr 26px;
  align-items: center;
  grid-column-gap: 10px;

  padding: 8px 3px 8px 0;

  font-size: 20px;
  line-height: 24px;
  color: #323232;

  word-break: break-word;

  border-radius: 4px;

  &:hover {
    background: #f1f1f1;

    .optionsBtn {
      opacity: 1;
    }
  }

  ${(props) =>
    props.isOptionsOpen &&
    css`
      background: #f1f1f1;
      opacity: 1;
    `}

  &isLoading {
    animation-name: ${rotate};
  }
`;

export const StyledButtonWithIcon = styled(ButtonWithIcon)<{ options?: boolean; marker?: boolean }>`
  width: 24px;
  height: 24px;

  ${(props) =>
    props.marker &&
    css`
      &:disabled {
        cursor: unset;
      }
    `}

  ${(props) =>
    props.options &&
    css`
      border-radius: 41px;

      opacity: 0;

      &:hover {
        background: #dedede;
      }
    `}
`;

export const StyledArrowIcon = styled(ArrowIcon)<{ expanded: boolean }>`
  ${(props) =>
    props.expanded &&
    css`
      transform: rotate(90deg);
    `}
`;

export const OptionsBtnWrapper = styled.div`
  position: relative;
`;

export const ChildrenWrapper = styled.div`
  grid-column: 1/4;

  padding: 12px 0 0 16px;
  margin-bottom: 12px;
`;

export const StyledScTagLink = styled(ScTagLink)`
  font-size: 20px;
  line-height: 24px;

  &::first-letter {
    text-transform: uppercase;
  }
`;
