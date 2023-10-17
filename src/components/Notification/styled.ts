import styled, { css } from 'styled-components';

export const NotificationContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;

  border-radius: 12px;

  max-width: 510px;
  width: fit-content;

  padding: 17px 19px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  ${(props: { type: 'warning' | 'success' | 'error' }) => {
    switch (props.type) {
      case 'success':
        return css`
          background-color: #eeffe8;
        `;
      case 'warning':
        return css`
          background-color: #feffe2;
        `;
      case 'error':
        return css`
          background-color: #f6cab1;
        `;
    }
  }}
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;

  gap: 8px;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  color: #323232;
`;

export const Text = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  color: #737373;
`;

export const Icon = styled.div`
  margin-right: 10px;

  flex-shrink: 0;
`;

export const CloseButton = styled.div`
  flex-shrink: 0;

  margin-left: 39px;
  cursor: pointer;
`;
