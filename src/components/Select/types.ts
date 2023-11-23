import * as React from 'react';

export type HighlightFormat = 'word' | 'wholly';

export interface IOnCloseProps {
  value: string;
  disabled?: boolean;
}
export type TRenderChip = () => React.ReactNode | IChipProps;
export interface IChipProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClose?: (props: IOnCloseProps) => void;
}

export interface IConstantOption {
  value: string;
  disabled: boolean;
  children: React.ReactNode;
  renderChip: TRenderChip;
}

export interface IDropdownOption {
  value: string;
  disabled: boolean;
  ref?: React.RefObject<HTMLDivElement> | null;
}

export interface IConstantSearchSelectContext {
  onConstantOptionMount: (option: IConstantOption) => void;
  onConstantOptionUnMount: (option: IConstantOption) => void;
  searchValue: string;
}

export interface IDropDownSearchSelectContext {
  onDropDownOptionMount: (option: IDropdownOption) => void;
  onDropDownOptionUnMount: (option: IDropdownOption) => void;
  onOptionClick: (value: string) => void;
  setHoverValue: (value: string) => void;
  selectValue?: string | string[];
  hoverValue: string;
  searchValue: string;
  highlightFormat: HighlightFormat;
  multiple: boolean;
  defaultHighlighted: boolean;
  showCheckbox: boolean;
}

export interface IOptionContext {
  onAddTextToHighlight: (text: string) => void;
}

export interface IOptionGroupContext {
  disabled?: boolean;
  label: string;
}

export type SelectDimention = 's' | 'm';
