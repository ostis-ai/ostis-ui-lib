import { createContext, PropsWithChildren, useContext } from 'react';

import {
  IConstantSearchSelectContext,
  IDropDownSearchSelectContext,
  IOptionContext,
  IOptionGroupContext,
} from './types';

const noop = () => void 0;

const ConstantSearchSelectContext = createContext<IConstantSearchSelectContext>({
  onConstantOptionMount: noop,
  onConstantOptionUnMount: noop,
  searchValue: '',
  multiple: false,
});

export const useConstantSearchSelectContext = () => useContext(ConstantSearchSelectContext);

export const ConstantSearchSelectProvider = ({
  children,
  ...restProps
}: PropsWithChildren<IConstantSearchSelectContext>) => (
  <ConstantSearchSelectContext.Provider value={restProps}>{children}</ConstantSearchSelectContext.Provider>
);

const DropDownSearchSelectContext = createContext<IDropDownSearchSelectContext>({
  onDropDownOptionMount: noop,
  onDropDownOptionUnMount: noop,
  onOptionClick: noop,
  setHoverValue: noop,
  hoverValue: '',
  searchValue: '',
  highlightFormat: 'word',
  multiple: false,
  defaultHighlighted: true,
  showCheckbox: true,
  mobile: false,
});

export const useDropDownSearchSelectContext = () => useContext(DropDownSearchSelectContext);

export const DropDownSearchSelectProvider = ({
  children,
  ...restProps
}: PropsWithChildren<IDropDownSearchSelectContext>) => (
  <DropDownSearchSelectContext.Provider value={restProps}>{children}</DropDownSearchSelectContext.Provider>
);

const OptionContext = createContext<IOptionContext>({
  onAddTextToHighlight: noop,
});

export const useOptionContext = () => useContext(OptionContext);

export const OptionProvider = ({ children, ...restProps }: PropsWithChildren<IOptionContext>) => (
  <OptionContext.Provider value={restProps}>{children}</OptionContext.Provider>
);

const OptionGroupContext = createContext<IOptionGroupContext>({
  label: '',
});

export const useOptionGroupContext = () => useContext(OptionGroupContext);

export const OptionGroupProvider = ({ children, ...restProps }: PropsWithChildren<IOptionGroupContext>) => (
  <OptionGroupContext.Provider value={restProps}>{children}</OptionGroupContext.Provider>
);
