import { ChangeEvent, useEffect } from 'react';
import { Checkbox } from '@components/Checkbox';
import { Option, Select } from '@components/Select';
import { Textarea } from '@components/Textarea';
import styled from 'styled-components';

import { type PlaygroundRow as PlaygroundRowType, BooleanRow, CommonPlaygroundRow, InputRow, SelectRow } from './types';
import { usePlayground, usePlaygroundContent } from './usePlayground';

const RowItem = styled.div`
  padding: 8px 4px;
  display: flex;
  align-items: center;
`;

const SelectControl = (props: CommonPlaygroundRow & SelectRow) => {
  const { onAddValue } = usePlayground();
  const { values } = usePlaygroundContent();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onAddValue(props.name, e.target.value);
  };

  return (
    <Select onChange={onChange} value={values[props.name] || ''}>
      {props.options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

const CheckboxControl = (props: CommonPlaygroundRow & BooleanRow) => {
  const { onAddValue } = usePlayground();
  const { values } = usePlaygroundContent();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAddValue(props.name, e.target.checked);
  };

  return <Checkbox onChange={onChange} checked={values[props.name] || false} />;
};

const InputControl = (props: CommonPlaygroundRow & InputRow) => {
  const { onAddValue } = usePlayground();
  const { values } = usePlaygroundContent();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onAddValue(props.name, e.target.value);
  };

  return <Textarea onChange={onChange} value={values[props.name] || ''} />;
};

const Control = (props: PlaygroundRowType) => {
  if (props.type === 'boolean') return <CheckboxControl {...props} />;
  if (props.type === 'select') return <SelectControl {...props} />;
  if (props.type === 'input') return <InputControl {...props} />;

  return <>-</>;
};

export const PlaygroundRow = (props: PlaygroundRowType) => {
  const { onAddValue } = usePlayground();

  useEffect(() => {
    if (props.default) {
      onAddValue(props.name, props.default);
    }
  }, [onAddValue, props.default, props.name]);

  return (
    <>
      <RowItem>{props.name}</RowItem>
      <RowItem>{props.description || '-'}</RowItem>
      <RowItem>{props.default || '-'}</RowItem>
      <RowItem>
        <Control {...props} />
      </RowItem>
    </>
  );
};
