import { InputHTMLAttributes, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { StyledChip } from '../Chips/styled';
import { Highlight } from '../Highlight';
import type { RenderOptionValue, RenderOptionValueProps } from '../types';
import {
  OptionProvider,
  useConstantSearchSelectContext,
  useDropDownSearchSelectContext,
  useOptionGroupContext,
} from '../useSearchSelectContext';
import { getTextHighlightMeta } from '../utils';

import { StyledCheckbox, StyledDropdownOption } from './styled';

interface IRenderOptionProps {
  disabled?: boolean;
  searchValue?: string;
  isHovered?: boolean;
}

interface IRenderOptionProps {
  disabled?: boolean;
  searchValue?: string;
  isHovered?: boolean;
}

interface IProps extends InputHTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  value: string;
  children?: ReactNode;
  renderOption?: (props: IRenderOptionProps) => ReactNode;
  renderValue?: RenderOptionValue;
}

const DropDownOption = ({
  disabled = false,
  value,
  children,
  renderOption,
  renderValue: _renderValue,
  ...htmlProps
}: IProps) => {
  const {
    defaultHighlighted,
    showCheckbox,
    selectValue,
    mobile,
    multiple,
    searchValue,
    hoverValue,
    onOptionClick,
    setHoverValue,
    onDropDownOptionMount,
    onDropDownOptionUnMount,
  } = useDropDownSearchSelectContext();
  const optionGroupContext = useOptionGroupContext();

  const defaultOnMouseDown = htmlProps.onMouseDown;

  const optionIsDiabled = optionGroupContext?.disabled || disabled;

  const childrenOrHiglightedChildren = useMemo(
    () => (typeof children === 'string' && defaultHighlighted ? <Highlight>{children}</Highlight> : children),
    [defaultHighlighted, children],
  );

  const defaultMultipleOption = useMemo(
    () => (
      <>
        {showCheckbox && <StyledCheckbox checked={selectValue?.includes(value)} disabled={disabled} readOnly />}
        {childrenOrHiglightedChildren}
      </>
    ),
    [showCheckbox, selectValue, value, disabled, childrenOrHiglightedChildren],
  );

  const ref = useRef<HTMLDivElement>(null);

  const renderDefaultOption = useCallback(
    () => (multiple ? defaultMultipleOption : childrenOrHiglightedChildren),
    [multiple, defaultMultipleOption, childrenOrHiglightedChildren],
  );

  const onClick = useCallback(() => onOptionClick?.(value), [onOptionClick, value]);
  const onMouseOnOption = useCallback(() => setHoverValue?.(value), [setHoverValue, value]);
  const onMouseLeave = useCallback(() => setHoverValue?.(''), [setHoverValue]);
  const onMouseDown = useCallback(
    (evt: MouseEvent<HTMLDivElement>) => {
      onClick();
      defaultOnMouseDown?.(evt);
    },
    [onClick, defaultOnMouseDown],
  );

  const option = useMemo(
    () => ({
      value,
      disabled: optionIsDiabled,
      ref,
    }),
    [value, optionIsDiabled],
  );

  const resultChildren = useMemo(
    () =>
      renderOption
        ? renderOption({
            disabled,
            searchValue,
            isHovered: hoverValue === value,
          })
        : renderDefaultOption(),
    [renderOption, renderDefaultOption, disabled, value, searchValue, hoverValue],
  );

  useEffect(() => {
    onDropDownOptionMount?.(option);
    return () => onDropDownOptionUnMount?.(option);
  }, [onDropDownOptionMount, onDropDownOptionUnMount, option]);

  return (
    <StyledDropdownOption
      {...htmlProps}
      className={htmlProps.className}
      $disabled={optionIsDiabled}
      $selected={selectValue === value}
      $active={hoverValue === value}
      $mobile={mobile}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseOnOption}
      onMouseMove={onMouseOnOption}
      onMouseLeave={onMouseLeave}
    >
      {resultChildren}
    </StyledDropdownOption>
  );
};

const ConstantOption = ({ disabled = false, value, children, renderOption, renderValue }: IProps) => {
  const { searchValue, multiple, onConstantOptionMount, onConstantOptionUnMount } = useConstantSearchSelectContext();
  const optionGroupContext = useOptionGroupContext();

  const optionIsDiabled = optionGroupContext?.disabled || disabled;

  const defaultRenderOptionValue = useCallback(
    ({ onClose }: RenderOptionValueProps) => {
      if (!multiple) return <>{children}</>;
      return (
        <StyledChip onClose={onClose} disabled={optionIsDiabled} size="l">
          {children}
        </StyledChip>
      );
    },
    [children, multiple, optionIsDiabled],
  );

  const resultRenderValue = renderValue || defaultRenderOptionValue;

  const resultChildren = useMemo(
    () =>
      renderOption
        ? renderOption({
            disabled,
            searchValue,
          })
        : children,
    [renderOption, disabled, children, searchValue],
  );

  const option = useMemo(
    () => ({
      value,
      disabled: optionIsDiabled,
      children: resultChildren,
      renderValue: resultRenderValue,
    }),
    [value, optionIsDiabled, resultChildren, resultRenderValue],
  );

  useEffect(() => {
    onConstantOptionMount?.(option);
    return () => onConstantOptionUnMount?.(option);
  }, [onConstantOptionMount, onConstantOptionUnMount, option]);

  return null;
};

const ConstantOptionWrapper = (props: IProps) => {
  return <ConstantOption {...props} />;
};

const DropDownOptionWrapper = (props: IProps) => {
  const [textsToHighlight, setTextsToHighlight] = useState<string[] | null>(null);
  const dropDownSelectContext = useDropDownSearchSelectContext();

  const highlighted = textsToHighlight?.some(
    (text) =>
      getTextHighlightMeta(text, dropDownSelectContext?.searchValue, dropDownSelectContext?.highlightFormat)
        .shouldHiglight,
  );

  const onAddTextToHighlight = useCallback(
    (text: string) => setTextsToHighlight((prev) => Array.from(new Set([...(prev || []), text]))),
    [],
  );

  const shouldRender = textsToHighlight === null || highlighted;

  return (
    <OptionProvider onAddTextToHighlight={onAddTextToHighlight}>
      {dropDownSelectContext && shouldRender && <DropDownOption {...props} />}
    </OptionProvider>
  );
};

export const Option = (props: IProps) => (
  <>
    <ConstantOptionWrapper {...props} />
    <DropDownOptionWrapper {...props} />
  </>
);
