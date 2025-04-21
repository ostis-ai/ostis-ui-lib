import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Close from '@assets/close.svg';
import { DropdownOption } from '@components/DropdownOption';
import { IconButton } from '@components/IconButton';
import { Input } from '@components/Input';
import { Spinner } from '@components/Spinner';
import { useBooleanState } from '@hooks/useBooleanState';
import { useClickOutside } from '@hooks/useClickOutside';
import { InputStatus } from '@model/input';
import { refSetter } from '@utils/refSetter';

import { Chips } from './Chips';
import { StyledChip } from './Chips/styled';
import { defaultEmptyMessage, defaultLoadingText } from './constants';
import {
  Hidden,
  IconClose,
  IconPanel,
  IconsLeft,
  NativeSelect,
  PopupChipsWrapper,
  PopupHeader,
  PopupInputWrapper,
  PopupValuesWrapper,
  SelectInput,
  SelectWrapper,
  StringValueWrapper,
  StyledDropdown,
  StyledOpenStatusButton,
  StyledPopup,
  ValueWrapper,
} from './styled';
import type { HighlightFormat, IConstantOption, IdleSelectHeight, IDropdownOption } from './types';
import { ConstantSearchSelectProvider, DropDownSearchSelectProvider } from './useSearchSelectContext';
import { changeInputData, preventDefault, scrollToNotVisibleELem } from './utils';

/**
 * TODO:
 * refactor to display value in input if value is string
 * IntersectionObserver -> manual DOM calcs?
 * What to do if there are to many chips
 * theme
 *
 * Limit chips width
 * Playground for Story
 */

type PartialOption = { value: string; disabled: boolean } & Record<string, any>;
const findAbledOptionValue = (options: PartialOption[]) => options.find(({ disabled }) => !disabled)?.value;

const stopPropagation = (evt: React.BaseSyntheticEvent) => evt.stopPropagation();

export interface SelectProps extends Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'onFocus' | 'onBlur'> {
  renderedEmptyValue?: React.ReactNode;
  value?: string | string[];
  isLoading?: boolean;
  showOptions?: boolean;
  mobile?: boolean;
  mode?: 'select' | 'search';
  // dimention?: SelectDimention;
  // appearance?: 'green' | 'brown';
  loadingAppearance?: 'input' | 'options';
  loadingMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  multiple?: boolean;
  status?: InputStatus;
  defaultHighlighted?: boolean;
  showCheckbox?: boolean;
  defaultValue?: string | string[];
  idleHeight?: IdleSelectHeight;
  highlightFormat?: HighlightFormat;
  portalTargetRef?: React.RefObject<HTMLElement>;
  iconsRight?: React.ReactNode;
  iconsLeft?: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
  renderSelectValue?: (value: string | string[] | undefined, searchText: string) => React.ReactNode;
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: (evt: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (evt: React.FocusEvent<HTMLDivElement>) => void;
  hideSelectedValues?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      value,
      mobile = false,
      isLoading,
      showOptions = true,
      className,
      style,
      iconsRight,
      iconsLeft,
      portalTargetRef,
      disabled = false,
      placeholder,
      defaultValue,
      children,
      status,
      renderedEmptyValue,
      loadingAppearance = 'input',
      idleHeight = 'fixed',
      mode = 'select',
      highlightFormat = 'word',
      multiple = false,
      defaultHighlighted = true,
      showCheckbox = true,
      loadingMessage: loadingMessageFromProps,
      emptyMessage: emptyMessageFromProps,
      containerRef: containerRefFromProps,
      onInputChange,
      renderSelectValue,
      hideSelectedValues,
      onFocus: onFocusFromProps,
      onBlur: onBlurFromProps,
      ...props
    },
    ref,
  ) => {
    const [localValue, setLocalValue] = useState(value ?? defaultValue);
    const [searchValue, setSearchValue] = useState('');
    const [hoverValue, setHoverValue] = useState('');
    const [shouldRenderSelectValue, setShouldRenderSelectValue] = useState(false);

    const [constantOptions, setConstantOptions] = useState<IConstantOption[]>([]);
    const [dropDownOptions, setDropDownOptions] = useState<IDropdownOption[]>([]);

    const [isSearchPanelOpen, openSearchPanel, closeSearchPanel, toggleSearchPanel] = useBooleanState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isDeleteButton, setIsDeleteButton] = useState(false);

    const loadingMessage = loadingMessageFromProps || defaultLoadingText;
    const emptyMessage = emptyMessageFromProps || defaultEmptyMessage;

    const selectIsUncontrolled = value === undefined;
    const modeIsSelect = mode === 'select';

    const selectedOption = useMemo(() => {
      if (hideSelectedValues) {
        return null;
      }

      return multiple ? null : constantOptions.find((option) => option.value === localValue);
    }, [hideSelectedValues, multiple, constantOptions, localValue]);

    const selectedOptions = useMemo(() => {
      if (hideSelectedValues) {
        return [];
      }

      return multiple ? constantOptions.filter((option) => localValue?.includes(option.value)) : [];
    }, [constantOptions, localValue, multiple, hideSelectedValues]);

    const hoverOptionIndex = useMemo(
      () => dropDownOptions.findIndex((option) => option.value === hoverValue),
      [dropDownOptions, hoverValue],
    );

    const dropDownChildren = useMemo(() => {
      if (isLoading && loadingAppearance === 'options') return <DropdownOption>{loadingMessage}</DropdownOption>;

      return (
        <>
          {!dropDownOptions.length && <DropdownOption>{emptyMessage}</DropdownOption>}
          {children}
        </>
      );
    }, [isLoading, loadingMessage, children, dropDownOptions, emptyMessage, loadingAppearance]);

    const popupInputRef = useRef<HTMLInputElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dropDownRef = useRef<HTMLDivElement | null>(null);
    const mutableState = useRef<{ shouldExtendInputValue: boolean }>({
      shouldExtendInputValue: false,
    });

    const onConstantOptionMount = useCallback(
      (option: IConstantOption) =>
        setConstantOptions((prev) => {
          if (prev.some(({ value }) => value === option.value)) return prev;
          return [...prev, option];
        }),
      [],
    );

    const onConstantOptionUnMount = useCallback(
      (option: IConstantOption) =>
        setConstantOptions((prev) =>
          prev.filter((prevOption) => prevOption.value !== option.value || localValue?.includes(option.value)),
        ),
      [localValue],
    );

    const onDropDownOptionMount = useCallback(
      (option: IDropdownOption) => setDropDownOptions((prev) => [...prev, option]),
      [],
    );

    const onDropDownOptionUnMount = useCallback(
      (option: IDropdownOption) =>
        setDropDownOptions((prev) => prev.filter((prevOption) => prevOption.value !== option.value)),
      [],
    );

    const onCloseSelect = useCallback(() => {
      closeSearchPanel();
      setHoverValue(Array.isArray(localValue) ? localValue[0] : localValue || '');
      if (inputRef.current) changeInputData(inputRef.current, { value: '' });
      setShouldRenderSelectValue(true);
    }, [closeSearchPanel, localValue]);

    const handleOptionSelect = useCallback(
      (optionValue: string) => {
        const selectElem = selectRef.current;

        if (!selectElem) return;

        const optionElems = Array.from(selectElem.options);
        const targetOptionElem = optionElems.find((option) => option.value === optionValue);

        if (!targetOptionElem) return;

        if (!multiple) optionElems.forEach((option) => (option.selected = false));

        targetOptionElem.selected = multiple ? !targetOptionElem.selected : true;
        selectElem.dispatchEvent(new Event('change', { bubbles: true }));

        if (!multiple) onCloseSelect();
      },
      [onCloseSelect, multiple],
    );

    const shouldFixMultiSelectHeight = idleHeight === 'fixed' && !isSearchPanelOpen && !mobile;

    const renderMultipleSelectValue = useCallback(
      () => (
        <Chips
          options={selectedOptions}
          idleHeight={idleHeight}
          disabled={disabled}
          onChipRemove={mobile ? undefined : handleOptionSelect}
        />
      ),
      [selectedOptions, idleHeight, disabled, mobile, handleOptionSelect],
    );

    const isEmptyValue = multiple ? !localValue?.length : !localValue;
    const isEmpty = isEmptyValue && !searchValue;

    const renderedSelectValue = renderSelectValue?.(localValue, searchValue);

    const renderedSelectedOption = selectedOption?.children;
    const renderedDefaultSelectValue = multiple ? renderMultipleSelectValue() : renderedSelectedOption;
    const visibleValue =
      renderedSelectValue ||
      renderedDefaultSelectValue ||
      (renderedEmptyValue ?? hideSelectedValues ? null : localValue) ||
      null;

    const visibleValueIsString = typeof visibleValue === 'string';

    const shouldFixSingleSelectHeight = idleHeight === 'fixed' && (visibleValueIsString || isEmpty);
    const shouldFixHeight = multiple ? shouldFixMultiSelectHeight : shouldFixSingleSelectHeight;

    const wrappedVisibleValue = () => {
      if (hideSelectedValues) return;

      return visibleValueIsString ? <StringValueWrapper>{visibleValue}</StringValueWrapper> : visibleValue;
    };

    const mutateAndExtendTargetInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (!mutableState.current.shouldExtendInputValue || !visibleValueIsString) return;
      evt.target.value = `${visibleValue}${evt.target.value}`;
      mutableState.current.shouldExtendInputValue = false;
    };

    const onSingleLocalInputChange = () => setShouldRenderSelectValue(false);

    const onLocalInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (!multiple) onSingleLocalInputChange();
      mutateAndExtendTargetInputValue(evt);
      setSearchValue(evt.target.value);
      onInputChange?.(evt);
    };

    const onMultipleSelectBackSpace = () => {
      const lastAbledSelectedOptionValue = findAbledOptionValue(selectedOptions.reverse());
      if (!lastAbledSelectedOptionValue) return;
      handleOptionSelect(lastAbledSelectedOptionValue);
    };

    const deleteOrHideSelectValueOnBackspace = () => {
      if (searchValue || !localValue || hideSelectedValues) return;
      if (!multiple) return setShouldRenderSelectValue(false);
      onMultipleSelectBackSpace();
    };

    const chooseOptionOnEnter = () => {
      const targetOption = dropDownOptions[hoverOptionIndex];
      if (!targetOption) return;
      handleOptionSelect(targetOption.value);

      if (multiple) return;
      onCloseSelect();
    };

    const onOpenedSelectEnter = () => chooseOptionOnEnter();

    const onEnter = () => {
      if (isSearchPanelOpen) return onOpenedSelectEnter();
      openSearchPanel();
    };

    const scrollToOption = (optionValue: string) => {
      const scrollElem = dropDownRef.current;
      const optionElem = dropDownOptions.find((option) => option.value === optionValue)?.ref?.current;
      if (!scrollElem || !optionElem) return;

      scrollToNotVisibleELem(optionElem, scrollElem);
    };

    const findNextHoverOptionValue = useCallback(() => {
      const nextAbledOptionValue = findAbledOptionValue(dropDownOptions.slice(hoverOptionIndex + 1));
      if (nextAbledOptionValue) return nextAbledOptionValue;
      return findAbledOptionValue(dropDownOptions);
    }, [hoverOptionIndex, dropDownOptions]);

    const findPrevHoverOptionValue = useCallback(() => {
      const sliceInd = hoverOptionIndex === -1 ? undefined : hoverOptionIndex;
      const prevAbledOptionValue = findAbledOptionValue(dropDownOptions.slice(0, sliceInd).reverse());
      if (prevAbledOptionValue) return prevAbledOptionValue;
      return findAbledOptionValue(dropDownOptions.slice().reverse());
    }, [hoverOptionIndex, dropDownOptions]);

    const handleKeyUp = (e: React.KeyboardEvent) => {
      const code = e.code;

      switch (code) {
        case 'Enter': {
          onEnter();
          break;
        }
        case 'Escape': {
          onCloseSelect();
          break;
        }
        case 'ArrowUp': {
          const prevValue = findPrevHoverOptionValue();
          if (!prevValue) break;
          scrollToOption(prevValue);
          setHoverValue(prevValue);
          break;
        }
        case 'ArrowDown': {
          const nextValue = findNextHoverOptionValue();
          if (!nextValue) break;
          scrollToOption(nextValue);
          setHoverValue(nextValue);
          break;
        }
      }
    };

    const onSelectKeyDown = (e: React.KeyboardEvent) => {
      const code = e.code;
      const preventKeys = ['Enter', 'Space', 'ArrowDown', 'ArrowUp'];
      if (preventKeys.includes(code)) {
        // Prevent native select events
        e.preventDefault();
      }
    };

    const onWrapperClick = () => {
      openSearchPanel();
    };

    const extendSelectValueToInputValue = () => {
      if (!visibleValueIsString || searchValue || !shouldRenderSelectValue) return;

      mutableState.current.shouldExtendInputValue = true;
    };

    const narrowSelectValueToInputValue = (evt: React.KeyboardEvent) => {
      if (!visibleValueIsString || !inputRef.current || searchValue || !shouldRenderSelectValue || !localValue) return;

      // Предотвратить удаление выделенного с помощью selection символа
      evt.preventDefault();
      const newInputValue = visibleValue.slice(0, -1);
      changeInputData(inputRef.current, {
        value: newInputValue,
        selectionEnd: newInputValue.length,
        selectionStart: newInputValue.length,
      });
    };

    const onWrapperKeyDown = (evt: React.KeyboardEvent) => {
      const code = evt.code;
      if (code === 'ArrowUp' || code === 'ArrowDown') evt.preventDefault();
      if (evt.key.length === 1) extendSelectValueToInputValue();
      if (code === 'Backspace' && !evt.repeat) deleteOrHideSelectValueOnBackspace();
      if (code === 'Backspace') narrowSelectValueToInputValue(evt);
      if (code === 'Enter' && isSearchPanelOpen) evt.preventDefault();
    };

    const onFocus = (evt: React.FocusEvent<HTMLDivElement>) => {
      setIsFocused(true);
      onFocusFromProps?.(evt);
    };

    const onBlur = (evt: React.FocusEvent<HTMLDivElement>) => {
      setIsFocused(false);

      if (!evt.currentTarget.contains(evt.relatedTarget)) {
        onBlurFromProps?.(evt);
      }
    };

    const onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
      if (selectIsUncontrolled) {
        setLocalValue(
          multiple ? Array.from(evt.target.selectedOptions).map((option) => option.value) : evt.target.value,
        );
      }

      props.onChange?.(evt);
    };

    const handleClickCloseIcon = () => {
      onCloseSelect();
    };

    useEffect(() => {
      if (!Array.isArray(localValue)) setHoverValue(localValue || '');
    }, [localValue]);

    useEffect(() => {
      if ((!isFocused && !multiple) || multiple) setShouldRenderSelectValue(true);
    }, [multiple, isFocused]);

    useEffect(() => {
      if (isSearchPanelOpen) {
        if (mobile) return popupInputRef.current?.focus();
        modeIsSelect ? selectRef.current?.focus() : inputRef.current?.focus();
      } else {
        modeIsSelect ? selectRef.current?.blur() : inputRef.current?.blur();
      }
    }, [isSearchPanelOpen, mobile, modeIsSelect]);

    useEffect(() => {
      if (!selectIsUncontrolled) setLocalValue(value);
    }, [value, selectIsUncontrolled]);

    useEffect(() => {
      dropDownRef.current?.scroll(0, 0);
    }, [dropDownOptions]);

    useEffect(() => {
      searchValue ? setIsDeleteButton(true) : setIsDeleteButton(false);
    }, [searchValue]);

    useClickOutside([containerRef, dropDownRef], onCloseSelect);

    const dropdownProviderProps = {
      onOptionClick: handleOptionSelect,
      setHoverValue,
      onDropDownOptionMount,
      onDropDownOptionUnMount,
      highlightFormat,
      selectValue: localValue,
      searchValue,
      hoverValue,
      multiple,
      defaultHighlighted,
      showCheckbox,
      mobile,
    };

    return (
      <>
        <SelectWrapper
          className={className}
          $disabled={disabled}
          $focused={isFocused}
          $multiple={multiple}
          $status={status}
          style={style}
          ref={containerRef}
          onKeyUp={handleKeyUp}
          onKeyDown={onWrapperKeyDown}
          onClick={onWrapperClick}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          <Hidden>
            <ConstantSearchSelectProvider
              onConstantOptionMount={onConstantOptionMount}
              onConstantOptionUnMount={onConstantOptionUnMount}
              searchValue={searchValue}
              multiple={multiple}
            >
              {children}
            </ConstantSearchSelectProvider>
          </Hidden>
          <NativeSelect
            ref={refSetter(ref, selectRef)}
            value={localValue}
            multiple={multiple}
            disabled={disabled}
            onKeyDown={onSelectKeyDown}
            {...props}
            onChange={onChange}
          >
            <option value="" />
            {constantOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </NativeSelect>
          {iconsLeft && <IconsLeft>{iconsLeft}</IconsLeft>}
          <ValueWrapper $multiple={multiple} $fixHeight={shouldFixHeight} id="selectValueWrapper">
            {shouldRenderSelectValue && wrappedVisibleValue()}
            {((placeholder && isEmpty) || !modeIsSelect) && (
              <SelectInput
                tabIndex={-1}
                $multiple={multiple}
                ref={inputRef}
                placeholder={isEmpty || hideSelectedValues ? placeholder : undefined}
                disabled={disabled}
                readOnly={modeIsSelect}
                value={searchValue}
                onChange={onLocalInputChange}
              />
            )}
          </ValueWrapper>
          {showOptions && isSearchPanelOpen && !mobile && (
            <StyledDropdown
              id="selectDropdownContainer"
              targetRef={portalTargetRef || containerRef}
              onMouseDown={preventDefault}
              ref={dropDownRef}
              container={containerRefFromProps}
            >
              <DropDownSearchSelectProvider {...dropdownProviderProps}>{dropDownChildren}</DropDownSearchSelectProvider>
            </StyledDropdown>
          )}

          <IconPanel onClick={stopPropagation} onMouseDown={preventDefault}>
            {iconsRight && isDeleteButton && <IconClose onClick={handleClickCloseIcon}>{iconsRight}</IconClose>}
            {isLoading && loadingAppearance === 'input' && <Spinner size={22} appearance="#5896C0" />}
            <StyledOpenStatusButton $opened={isSearchPanelOpen} onClick={toggleSearchPanel} aria-hidden />
          </IconPanel>
        </SelectWrapper>
        {showOptions && isSearchPanelOpen && mobile && (
          <StyledPopup onClose={onCloseSelect}>
            <PopupHeader>
              <IconButton onClick={onCloseSelect}>
                <Close />
              </IconButton>
            </PopupHeader>
            <DropDownSearchSelectProvider {...dropdownProviderProps}>
              {!!selectedOptions.length && (
                <PopupChipsWrapper>
                  {selectedOptions.map((option) => (
                    <StyledChip key={option.value} onClose={() => handleOptionSelect(option.value)}>
                      {option.children}
                    </StyledChip>
                  ))}
                </PopupChipsWrapper>
              )}
              <PopupInputWrapper>
                <Input
                  placeholder={placeholder}
                  value={searchValue}
                  onChange={onLocalInputChange}
                  ref={popupInputRef}
                />
              </PopupInputWrapper>
              <PopupValuesWrapper>{dropDownChildren}</PopupValuesWrapper>
            </DropDownSearchSelectProvider>
          </StyledPopup>
        )}
      </>
    );
  },
);

Select.displayName = 'Select';
