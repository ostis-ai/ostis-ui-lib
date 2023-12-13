import { ReactNode } from 'react';
import { Button } from '@components/Button';
import { Notification } from '@components/Notification';
import { Playground } from '@components/Playground/Playground';
import { PlaygroundContent } from '@components/Playground/PlaygroundContent';
import { PlaygroundRow } from '@components/Playground/PlaygroundRow';
import { getRandomArrayElem } from '@utils/common';
import styled from 'styled-components';

import { toastPositions } from './constants';
import { ToastProvider } from './ToastProvider';
import { Toasts } from './Toasts/Toasts';
import { useToast } from './useToast';

type MyToastProps = {
  children: ReactNode;
};

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ToastWrapper = styled.div`
  padding: 16px;
  background-color: #eff8ef;
  border-radius: 12px;
  box-shadow: 0px 2px 4px 0px #00000040;
  display: flex;
  justify-content: space-between;
`;

const MyToast = ({ children }: MyToastProps) => {
  return <ToastWrapper>{children}</ToastWrapper>;
};

export const ToastStory = () => {
  const { addToast } = useToast();

  return (
    <Buttons>
      <Button
        onClick={() =>
          addToast(<Notification type="success" title="toast" />, { duration: 2000, position: 'topRight' })
        }
      >
        Autohiding toast
      </Button>
      <Button onClick={() => addToast(<Notification type="success" title="toast" />)}>Closeable toast</Button>
      <Button onClick={() => addToast(<MyToast>Hi</MyToast>)}>Custom toast</Button>
    </Buttons>
  );
};

const CustomToastPositionStoryInner = () => {
  const { addToast } = useToast();

  return (
    <Button
      onClick={() =>
        addToast(<Notification type="success" title="toast" />, {
          duration: 2000,
          position: getRandomArrayElem(toastPositions),
        })
      }
    >
      Autohiding toast
    </Button>
  );
};

const StyledToasts = styled(Toasts)`
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
`;

export const CustomToastPositionStory = () => {
  const renderToasts = () => <StyledToasts />;

  return (
    <ToastProvider renderToasts={renderToasts}>
      <CustomToastPositionStoryInner />
    </ToastProvider>
  );
};

export const ToastPlaygroundStory = () => {
  const { addToast } = useToast();

  return (
    <Playground>
      <PlaygroundContent>
        {({ id, duration, position, closeable }) => (
          <Button
            onClick={() =>
              addToast(<Notification type="success" title="toast" />, {
                duration: Number(duration) || duration,
                position,
                id,
                closeable,
              })
            }
          >
            Add toast
          </Button>
        )}
      </PlaygroundContent>
      <PlaygroundRow name="id" type="input" description="Toast id to make it unique and do not render more than one" />
      <PlaygroundRow name="duration" type="input" description="Autohiding toast" default="infinity" />
      <PlaygroundRow
        name="position"
        type="select"
        description="Where to put a toast"
        default="topCenter"
        options={toastPositions}
      />
      <PlaygroundRow
        name="closeable"
        type="boolean"
        description="Is toast closeable. When true onClose function will be passed to component provided in addToast first argument"
        default={true}
      />
    </Playground>
  );
};
