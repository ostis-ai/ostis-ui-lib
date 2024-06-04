import { FocusEvent, forwardRef, InputHTMLAttributes, MouseEvent, ReactNode, useRef, useState } from 'react';
import { InputStatus } from '@model/input';
import { refSetter } from '@utils/refSetter';

import * as Styled from './styled';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  showPasswordIcon?: ReactNode;
  hidePasswordIcon?: ReactNode;
  status?: InputStatus;
  inputClassName?: string;
  /**
   * @deprecated unused
   */
  isSearch?: boolean;
}

const setCursorPosition = (input: HTMLInputElement, position: number)=> {
  if(!input.setSelectionRange) return;

  setTimeout(() => {
    input.setSelectionRange(position, position);
  }, 0);
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      iconLeft,
      iconRight,
      type,
      status,
      className,
      inputClassName,
      disabled,
      style,
      showPasswordIcon = <Styled.ShowPassword />,
      hidePasswordIcon = <Styled.HidePassword />,
      ...restProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const innerRef = useRef<HTMLInputElement>(null);

    const onMakePasswordVisible = () => {
      inputType === 'password' ? setInputType('text') : setInputType('password');
      setIsShowPassword((prev) => !prev); 

      if(innerRef.current)  {
        setCursorPosition(innerRef.current, innerRef.current.value.length);
      }
    };

    const onWrapperClick = () => {
      innerRef?.current?.focus();
    };

    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      restProps.onFocus?.(e);
    };
    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      restProps.onBlur?.(e);
    };
    const onInputMouseDown = (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      restProps.onMouseDown?.(e);
    };

    const isPassword = type === 'password';

    return (
      <Styled.Wrapper
        $isFocused={isFocused}
        $isError={status === 'error'}
        $isDisabled={disabled}
        className={className}
        style={style}
        onClick={onWrapperClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        {iconLeft && <Styled.LeftIcon>{iconLeft}</Styled.LeftIcon>}
        <Styled.Input
          ref={refSetter<HTMLInputElement>(ref, innerRef)}
          autoComplete="off"
          spellCheck="false"
          type={inputType}
          disabled={disabled}
          {...restProps}
          className={inputClassName}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseDown={onInputMouseDown}
        />
        {(iconRight || isPassword) && (
          <Styled.RightIcon>
            {isPassword && isShowPassword && (
              <Styled.PasswordIconWrapper onClick={onMakePasswordVisible}>
                {showPasswordIcon}
              </Styled.PasswordIconWrapper>
            )}
            {isPassword && !isShowPassword && (
              <Styled.PasswordIconWrapper onClick={onMakePasswordVisible}>
                {hidePasswordIcon}
              </Styled.PasswordIconWrapper>
            )}
            {iconRight}
          </Styled.RightIcon>
        )}
      </Styled.Wrapper>
    );
  },
);

Input.displayName = 'Input';
