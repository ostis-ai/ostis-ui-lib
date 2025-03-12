import { ChangeEvent, KeyboardEvent, memo, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { useDecompositionContext } from '@components/DecompositionPanel/useDecompositionContext';
import { ScLangText } from '@components/Language';
import { useClickOutside } from '@hooks/useClickOutside';

import { ITransformedDecomposition } from '../../types';
import { EditTextarea } from '../EditTextarea';
import { Options } from '../Options';
import { TextAreaItem } from '../TextAreaItem';

import Point from './../../icons/point.svg';
import Option from './options.svg';
import {
  ChildrenWrapper,
  ItemContentWrapper,
  OptionsBtnWrapper,
  StyledArrowIcon,
  StyledButtonWithIcon,
  StyledScTagLink,
} from './styled';

interface INavigationListProps {
  data: ITransformedDecomposition[];
  children?: ReactNode;
  deletable: boolean;
  editable: boolean;
}

export const NavigationListInner = ({
  data,
  children,
  deletable,
  editable,
}: PropsWithChildren<INavigationListProps>) => {
  return (
    <ul>
      {data.map((item) => {
        return <NavigationItem key={item.id} menuItem={item} deletable={deletable} editable={editable} />;
      })}
      {children}
    </ul>
  );
};

interface INavigationItemProps {
  menuItem: ITransformedDecomposition;
  editable: boolean;
  deletable: boolean;
}

const NavigationItem = ({ menuItem, editable, deletable }: INavigationItemProps) => {
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

            {editable && !isEditInputShow && (
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
                    deletable={deletable}
                  />
                )}
              </OptionsBtnWrapper>
            )}
          </ItemContentWrapper>
          {menuItem.expanded && !!menuItem.children.length && (
            <ChildrenWrapper>
              <NavigationList data={menuItem.children} deletable={deletable} editable={editable}>
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

export const NavigationList = memo(NavigationListInner);
