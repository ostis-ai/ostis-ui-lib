import { ForwardedRef, forwardRef } from 'react';

import * as Styled from './styled';
import { InputV2Props } from './types';

const InputV2 = (
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
};

export default forwardRef(InputV2);
