import styled, { css } from 'styled-components';

export const SwitchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: end;

  width: 100%;
`;

export const Tab = styled.div<{ isActive: boolean }>`
  font-size: 26px;
  font-weight: 400;
  color: #c0c0c0;

  cursor: pointer;

  &:hover {
    background: #e9f3f6;
    path {
      fill: #5896c0;
    }
  }

  padding: 4px 8px;

  border-radius: 4px;

  path {
    fill: #c0c0c0;
  }

  ${(props) =>
    props.isActive &&
    css`
      background: #f8f8f8;

      path {
        fill: #5896c0;
      }
    `}
`;

export const Divider = styled.span`
  margin: 0 4px;

  border-left: 1px solid #c0c0c0;
`;
