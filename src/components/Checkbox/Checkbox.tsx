import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { CheckboxInput, CustomCheckbox, Label, LabelText, StyledCheckMark } from './styled';

export interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  ({ className, label, disabled = false, ...restProps }, ref) => {
    return (
      <Label className={className} $disabled={disabled}>
        <CheckboxInput disabled={disabled} type="checkbox" {...restProps} ref={ref} />
        <CustomCheckbox $disabled={disabled}>
          <StyledCheckMark $disabled={disabled} />
        </CustomCheckbox>
        {label && <LabelText $disabled={disabled}>{label}</LabelText>}
      </Label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
