export type CommonPlaygroundRow = {
  name: string;
  description?: string;
  default?: string | boolean | number;
};

export type BooleanRow = {
  type: 'boolean';
};

export type SelectRow = {
  type: 'select';
  options: string[];
};

export type InputRow = {
  type: 'input';
  placeholder?: string;
};

export type EmptyRow = {
  type: 'empty';
};

export type PlaygroundRow = CommonPlaygroundRow & (BooleanRow | SelectRow | InputRow | EmptyRow);
