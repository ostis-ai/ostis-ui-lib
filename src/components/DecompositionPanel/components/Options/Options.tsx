import { FC } from 'react';
import { useTranslate } from '@components/Language/useTranslate';

import { StyledButtonWithIcon, Wrap } from './styled';

interface IProps {
  onAddClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  deletable: boolean;
}

export const Options: FC<IProps> = ({ onAddClick, onEditClick, onDeleteClick, deletable }) => {
  const translate = useTranslate();

  return (
    <Wrap>
      <StyledButtonWithIcon onClick={onEditClick}>
        {translate({ ru: 'Переименовать', en: 'Rename' })}
      </StyledButtonWithIcon>
      {deletable && (
        <StyledButtonWithIcon onClick={onDeleteClick}>
          {translate({ ru: 'Удалить', en: 'Delete' })}
        </StyledButtonWithIcon>
      )}
      <StyledButtonWithIcon onClick={onAddClick}>
        {translate({ ru: 'Новый подраздел', en: 'New subsection' })}
      </StyledButtonWithIcon>
    </Wrap>
  );
};
