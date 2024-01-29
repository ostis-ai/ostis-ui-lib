import * as Styled from './styled';
import { ButtonProps } from './types';

export const Button = ({ variant = 'contained', color = 'primary', size = 'lg', children, ...props }: ButtonProps) => {
  return (
    <Styled.Button $variant={variant} $color={color} $size={size} {...props}>
      {children}
    </Styled.Button>
  );
};
