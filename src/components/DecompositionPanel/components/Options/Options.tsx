import { FC } from 'react';
import { useTranslate } from '@components/Language/useTranslate';

import { StyledIconButtonOld, Wrap } from './styled';

interface IProps {
  onAddClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isAdmin: boolean;
}

export const Options: FC<IProps> = ({ onAddClick, onEditClick, onDeleteClick, isAdmin }) => {
  const translate = useTranslate();

  return (
    <Wrap>
      <StyledIconButtonOld onClick={onEditClick}>
        {translate({ ru: 'Переименовать', en: 'Rename' })}
      </StyledIconButtonOld>
      {isAdmin && (
        <StyledIconButtonOld onClick={onDeleteClick}>{translate({ ru: 'Удалить', en: 'Delete' })}</StyledIconButtonOld>
      )}
      <StyledIconButtonOld onClick={onAddClick}>
        {translate({ ru: 'Новый подраздел', en: 'New subsection' })}
      </StyledIconButtonOld>
    </Wrap>
  );
};
