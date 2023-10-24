import { ForwardedRef, forwardRef } from 'react';

import * as Styled from './styled';
import { InputV2Props } from './types';

/**
 * @deprecated use input insted
 */
export const InputV2 = forwardRef(
  (
    { left, right, type = 'text', className, disabled, error, ...props }: InputV2Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <Styled.Box className={className}>
        {left && <Styled.Left disabled={disabled}>{left}</Styled.Left>}
        <Styled.Input
          ref={ref}
          type={type}
          disabled={disabled}
          {...props}
          left={!!left}
          right={!!right}
          error={!!error}
        />
        {right && <Styled.Right disabled={disabled}>{right}</Styled.Right>}
        {error && <Styled.Error>{error}</Styled.Error>}
      </Styled.Box>
    );
  },
);

InputV2.displayName = 'InputV2';
