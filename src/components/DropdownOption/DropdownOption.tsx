import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

import { Option } from './styled';

export const DropdownOption = forwardRef<HTMLDivElement, PropsWithChildren<HTMLAttributes<HTMLDivElement>>>(
  ({ children, className, ...restProps }, ref) => (
    <Option ref={ref} className={className} {...restProps}>
      {children}
    </Option>
  ),
);

DropdownOption.displayName = 'DropdownOption';
