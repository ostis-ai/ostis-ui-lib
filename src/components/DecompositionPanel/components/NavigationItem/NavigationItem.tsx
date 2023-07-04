import { ChangeEvent, FC, KeyboardEvent, memo, useEffect, useRef, useState } from 'react';
import { ScLangText } from '@components/Language';
import { useClickOutside } from '@hooks/useClickOutside';

import { ITransformedDecomposition, IUserData } from '../../types';
import { EditTextarea } from '../EditTextarea';
import { NavigationList } from '../NavigationList';
import { Options } from '../Options';
import { TextAreaItem } from '../TextAreaItem';

import Option from './../../icons/options.svg';
import Point from './../../icons/point.svg';
import { useDecompositionContext } from './../../useDecompositionContext';
import {
  ChildrenWrapper,
  ItemContentWrapper,
  OptionsBtnWrapper,
  StyledArrowIcon,
  StyledButtonWithIcon,
  StyledScTagLink,
} from './styled';

interface IProps {
  menuItem: ITransformedDecomposition;
  user: IUserData | null;
}

export const NavigationItemIner: FC<IProps> = ({ menuItem, user }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isAddInputShow, setIsAddInputShow] = useState(false);
  const [isEditInputShow, setIsEditInputShow] = useState(false);
  const [addInputValue, setAddInputValue] = useState('');

  const optionsWrapperRef = useRef<HTMLDivElement>(null);
  const wrapperAddInputRef = useRef<HTMLDivElement>(null);

  const { onToggle, onAdd, onEdit, onDelete } = useDecompositionContext();

  useEffect(() => {
    if (isAddInputShow) {
      closeOptions();
    }
  }, [isAddInputShow]);

  const onOptionsOpen = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const onAddClick = () => {
    onAdd(menuItem.id, '', 1);
    setIsAddInputShow(true);
  };

  const onEditClick = () => {
    setIsEditInputShow(true);
  };

  const closeOptions = () => {
    setIsOptionsOpen(false);
  };

  const saveAddItemValue = () => {
    if (addInputValue.trim()) onAdd(menuItem.id, addInputValue, Math.random());

    setIsAddInputShow(false);
    closeOptions();
    setAddInputValue('');
    onDelete(1);
  };

  const onChangeAddInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddInputValue(e.target.value);
  };

  const onTextAreaAddKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      saveAddItemValue();
    }

    if (e.key === 'Escape') {
      setIsAddInputShow(false);
      closeOptions();
      setAddInputValue('');
    }
  };

  const onCloseEditTextarea = () => {
    setIsEditInputShow(false);
    closeOptions();
  };

  const onUpdateItemValue = (value: string) => {
    onEdit(menuItem.id, value);
  };

  useClickOutside(optionsWrapperRef, closeOptions);
  useClickOutside(wrapperAddInputRef, saveAddItemValue);

  const renderItemText = (text: string) => (
    <>
      {!isEditInputShow && (
        <StyledScTagLink addr={menuItem.id} appearance="transparent">
          {text}
        </StyledScTagLink>
      )}
      {isEditInputShow && <EditTextarea defaultValue={text} onClose={onCloseEditTextarea} onSave={onUpdateItemValue} />}
    </>
  );

  if (!user) return null;
  return (
    <>
      {menuItem.title && (
        <li>
          <ItemContentWrapper isOptionsOpen={isOptionsOpen} isLoading={menuItem.isLoading}>
            <StyledButtonWithIcon
              marker={true}
              onClick={() => onToggle(menuItem.id)}
              disabled={!menuItem.children.length}
            >
              {menuItem.children.length ? <StyledArrowIcon expanded={menuItem.expanded} /> : <Point />}
            </StyledButtonWithIcon>
            <ScLangText addrOrSystemId={menuItem.id} renderText={renderItemText} />

            {!!user.can_edit && !isEditInputShow && (
              <OptionsBtnWrapper ref={optionsWrapperRef}>
                <StyledButtonWithIcon options className="optionsBtn" onClick={onOptionsOpen}>
                  <Option />
                </StyledButtonWithIcon>
                {isOptionsOpen && (
                  <Options
                    onAddClick={onAddClick}
                    onEditClick={onEditClick}
                    onDeleteClick={() => {
                      onDelete(menuItem.id);
                      closeOptions();
                    }}
                    isAdmin={!!user.is_admin}
                  />
                )}
              </OptionsBtnWrapper>
            )}
          </ItemContentWrapper>
          {menuItem.expanded && !!menuItem.children.length && (
            <ChildrenWrapper>
              <NavigationList data={menuItem.children} user={user}>
                {isAddInputShow && (
                  <TextAreaItem
                    value={addInputValue}
                    onChange={onChangeAddInput}
                    onKeyDown={onTextAreaAddKeyDown}
                    wrapperTextareaRef={wrapperAddInputRef}
                  />
                )}
              </NavigationList>
            </ChildrenWrapper>
          )}
        </li>
      )}
    </>
  );
};

export const NavigationItem = memo(NavigationItemIner);
