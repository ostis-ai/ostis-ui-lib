import { useMemo } from 'react';
import { IToast, Toast, TToastPosition, useToast } from '@components/Toast';

import { StyledToasts, Wrapper } from './styled';

type TGropedToasts = Record<TToastPosition, IToast[]>;

type Props = {
  className?: string;
};

export const Toasts = ({ className }: Props) => {
  const { toasts } = useToast();

  const toastsByPosition = useMemo(
    () =>
      toasts.reduce(
        (acc, toast) => ({
          ...acc,
          [toast.params.position]: [...(acc[toast.params.position] || []), toast],
        }),
        {} as TGropedToasts,
      ),
    [toasts],
  );

  return (
    <Wrapper className={className}>
      {Object.entries(toastsByPosition).map(([key, toasts]) => {
        const position = key as TToastPosition;

        return (
          <StyledToasts key={key} position={position}>
            {toasts.map(({ params }) => (
              <Toast key={params.id} id={params.id} />
            ))}
          </StyledToasts>
        );
      })}
    </Wrapper>
  );
};
