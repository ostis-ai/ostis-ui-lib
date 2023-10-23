import { forwardRef, TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';
import { InputStatus } from '@model/input';
import { refSetter } from '@utils/refSetter';

import { StyledTextarea } from './styled';

export interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  status?: InputStatus;
  minHeight?: number;
  maxHeight?: number;
  value?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ className, status, onChange, onKeyDown, minHeight = 39, maxHeight = 84, ...restProps }, refFromProps) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState('');
    const [textAreaHeight, setTextAreaHeight] = useState(`${minHeight}px`);
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
      const onResize = () => {
        setTextAreaHeight(`${minHeight}px`);
        if (!ref.current) return;
        setTextAreaHeight(`${ref.current.scrollHeight}px`);
      };

      if (!ref.current) return;
      setTextAreaHeight(`${ref.current.scrollHeight}px`);
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }, [minHeight, text]);

    useEffect(() => {
      setText(restProps.value || '');
    }, [restProps.value]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextAreaHeight(`${minHeight}px`);
      if (!ref.current) return;
      setText(event.target.value);
      onChange?.(event);
    };

    useEffect(() => {
      setIsScrollable(Number(textAreaHeight.replace(/[^0-9, ]/g, '')) > maxHeight);
    }, [maxHeight, textAreaHeight]);

    return (
      <StyledTextarea
        {...restProps}
        className={className}
        disabled={restProps.disabled}
        status={status}
        isScrollable={isScrollable}
        style={{
          height: textAreaHeight,
        }}
        onChange={onChangeHandler}
        onKeyDown={onKeyDown}
        ref={refSetter(ref, refFromProps)}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
