import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@hooks/useClickOutside';

import { StyledTextarea } from './styled';

interface IProps {
  onClose: () => void;
  onSave: (value: string) => void;
  defaultValue: string;
}

export const EditTextarea = ({ defaultValue, onClose, onSave }: IProps) => {
  const [editInputValue, setEditInputValue] = useState(defaultValue);

  const wrapperEditInputRef = useRef<HTMLTextAreaElement>(null);

  const saveEditItemValue = () => {
    if (editInputValue.trim()) onSave(editInputValue);

    onClose();
  };

  const onTextAreaEditKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      saveEditItemValue();
    }

    if (e.key === 'Escape') onClose();
  };

  const onChangeEditInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditInputValue(e.target.value);
  };

  useEffect(() => {
    if (wrapperEditInputRef.current) {
      wrapperEditInputRef.current.selectionStart = wrapperEditInputRef.current.value.length;
    }
  }, []);

  useClickOutside(wrapperEditInputRef, saveEditItemValue);

  return (
    <StyledTextarea
      value={editInputValue}
      onChange={onChangeEditInput}
      onKeyDown={onTextAreaEditKeyDown}
      ref={wrapperEditInputRef}
      autoFocus
    />
  );
};
