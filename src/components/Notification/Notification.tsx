import { ReactNode } from 'react';
import { TLanguage, TTexts, useLanguage } from '@components/Language';

import CloseIcon from './icons/close.svg';
import ErrorIcon from './icons/errorIcon.svg';
import SuccessIcon from './icons/successIcon.svg';
import WarningIcon from './icons/warningIcon.svg';
import { CenterContainer, CloseButton,Icon, MainContainer, NotificationContainer, Text, Title } from './styled';

const getTargetText = (text: TNotificationText, lang: TLanguage) => {
  if (typeof text === 'function') return text(lang);
  if (typeof text === 'object' && (text as TTexts)?.ru) return (text as TTexts)[lang];
  return text;
};

type TRenderText = (lang: TLanguage) => ReactNode;
export type TNotificationText = ReactNode | TRenderText | TTexts;

interface IProps {
  type: 'warning' | 'success' | 'error';
  title?: TNotificationText;
  text?: TNotificationText;
  onClose?: () => void;
}

const Notification = ({ type, title = '', text, onClose }: IProps) => {
  const lang = useLanguage();

  return (
    <NotificationContainer type={type}>
      <CenterContainer>
        <MainContainer>
          {type === 'success' && <Icon>{<SuccessIcon />}</Icon>}
          {type === 'warning' && <Icon>{<WarningIcon />}</Icon>}
          {type === 'error' && <Icon>{<ErrorIcon />}</Icon>}
          <Title>
            <>{getTargetText(title, lang)}</>
          </Title>
          {onClose && (
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          )}
        </MainContainer>
        {text && <Text>
          <>{getTargetText(text, lang)}</>
        </Text>}
      </CenterContainer>
    </NotificationContainer>
  );
};

export default Notification;
