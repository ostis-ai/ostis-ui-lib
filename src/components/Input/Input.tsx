import { FocusEvent, forwardRef, InputHTMLAttributes, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { InputStatus } from '@components/Textarea';
import { refSetter } from '@utils/refSetter';

import * as Styled from './styled';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  status?: InputStatus;
  inputClassName?: string;
  isSearch?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    { iconLeft, iconRight, type, status, className, inputClassName, isSearch = false, disabled, style, ...restProps },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const innerRef = useRef<HTMLInputElement>(null);
    const onMakePasswordVisible = () => {
      inputType === 'password' ? setInputType('text') : setInputType('password');
      setIsShowPassword((prev) => !prev);
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

    useEffect(() => {
      innerRef.current?.setSelectionRange(innerRef.current?.value.length, innerRef.current?.value.length);
    }, [inputType]);

    const isPassword = type === 'password';

    return (
      <Styled.Wrapper
        // className={cn(styles.wrapper, className, inputClassName, {
        //   [styles.search]: isSearch,
        //   [styles.search_focused]: isFocused && isSearch,
        //   [styles.wrapper_focused]: isFocused,
        //   [styles.wrapper_error]: status === 'error',
        //   [styles.wrapper_disabled]: disabled,
        // })}
        isSearch={isSearch}
        isFocused={isFocused}
        isError={status === 'error'}
        isDisabled={disabled}
        className={`${className} ${inputClassName}`}
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
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseDown={onInputMouseDown}
        />
        {(iconRight || isPassword) && (
          <Styled.RightIcon>
            {isPassword && isShowPassword && <Styled.ShowPassword onClick={onMakePasswordVisible} />}
            {isPassword && !isShowPassword && <Styled.HidePassword onClick={onMakePasswordVisible} />}
            {iconRight}
          </Styled.RightIcon>
        )}
      </Styled.Wrapper>
    );
  },
);

Input.displayName = 'Input';
