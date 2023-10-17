import { ForwardedRef, forwardRef, useState } from 'react';

import { InputV2 } from '../InputV2';

import Eye from './assets/eye.svg';
import EyeCrossed from './assets/eyeCrossed.svg';
import * as Styled from './styled';
import { InputPasswordProps } from './types';

const InputPassword = (props: InputPasswordProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <InputV2
      {...props}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      right={<Styled.Icon onClick={handleClick}>{showPassword ? <Eye /> : <EyeCrossed />}</Styled.Icon>}
    />
  );
};

export default forwardRef(InputPassword);
