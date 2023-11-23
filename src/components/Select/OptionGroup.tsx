import { ReactNode } from 'react';

import { OptionGroupProvider } from './useSearchSelectContext';

interface IProps {
  disabled?: boolean;
  label: string;
  children: ReactNode;
}

export const OptionGroup = ({ label, disabled = false, children }: IProps) => {
  return (
    <OptionGroupProvider label={label} disabled={disabled}>
      <div>{label}</div>
      {children}
    </OptionGroupProvider>
  );
};
