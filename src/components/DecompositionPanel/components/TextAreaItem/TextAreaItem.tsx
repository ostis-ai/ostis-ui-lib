import { ChangeEvent, FC, KeyboardEvent, RefObject } from 'react';

import PointIcon from './../../icons/point.svg';
import { StyledTextarea, Wrap } from './styled';

interface IProps {
  value: string;
  wrapperTextareaRef: RefObject<HTMLDivElement>;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaItem: FC<IProps> = ({ value, wrapperTextareaRef, onChange, onKeyDown }) => {
  return (
    <Wrap ref={wrapperTextareaRef}>
      <PointIcon />
      <StyledTextarea value={value} onChange={onChange} onKeyDown={onKeyDown} autoFocus />
    </Wrap>
  );
};
