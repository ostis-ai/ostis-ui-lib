import { ChangeEvent, useEffect, useState } from 'react';
import { Chip } from '@components/Chip';
import { getRandomInt } from '@utils/getRandomInt';
import styled from 'styled-components';

import { Option } from './Option';
import { Select } from './Select';

export const SimpleSelectStory = () => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
  return (
    <Select value={value} onChange={onChange} placeholder="Your choice, sir">
      <Option value="1">Red one</Option>
      <Option value="2">Blue one</Option>
      <Option value="3">More choices</Option>
    </Select>
  );
};

export const SearchSelectStory = () => (
  <Select mode="search">
    <Option value="1">This is text</Option>
    <Option value="2">One more text</Option>
    <Option value="3">Why cant we make one more option</Option>
  </Select>
);

export const SelectWithCustomOptionsStory = () => (
  <Select mode="search">
    <Option value="1">
      <div style={{ color: 'red' }}>Value 1</div>
    </Option>
    <Option value="2">
      <div style={{ color: 'blue' }}>Value 2</div>
    </Option>
  </Select>
);

export const SimpleMultiSelectStory = () => {
  return (
    <Select multiple placeholder="Choose an option">
      {Array.from({ length: 20 }).map((_, ind) => {
        return (
          <Option key={ind} value={String(ind)} disabled={ind === 1}>
            {ind === 1 ? 'Disabled option' : `Value ${ind}`}
          </Option>
        );
      })}
    </Select>
  );
};

export const MultiSearchSelectStory = () => {
  const [selectValue, setSelectValue] = useState<string[]>([]);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValues = Array.from(e.target.selectedOptions).map((option) => option.value);
    setSelectValue(newValues);
  };

  return (
    <Select mode="search" multiple value={selectValue} onChange={onChange} placeholder="Placeholder">
      <Option value="0">Really big one really big one really big one really big one really big one</Option>
      <Option value="1">String 1</Option>
      <Option value="2">Some more info</Option>
      <Option value="3">Hello</Option>
      {Array.from({ length: 20 }).map((_, ind) => {
        return <Option key={ind} value={String(ind + 4)}>{`Value ${ind}`}</Option>;
      })}
    </Select>
  );
};

export const StyledChip = styled(Chip)<{ color?: string }>`
  max-width: fit-content;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border-color: ${({ color }) => color};
`;

export const CustomChipsStory = () => {
  const [selectValue, setSelectValue] = useState<string[]>(['0', '1', '2']);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValues = Array.from(e.target.selectedOptions).map((option) => option.value);
    setSelectValue(newValues);
  };

  return (
    <Select mode="search" multiple value={selectValue} onChange={onChange} placeholder="Placeholder">
      <Option value="0">Really big one really big one really big one really big one really big one</Option>
      <Option
        value="1"
        renderValue={({ onClose }) => (
          <StyledChip onClose={onClose} color="#EC7575">
            Red chip
          </StyledChip>
        )}
      >
        Red chip
      </Option>
      <Option
        value="2"
        renderValue={({ onClose }) => (
          <StyledChip onClose={onClose} color="#17D463">
            Green chip
          </StyledChip>
        )}
      >
        Green chip
      </Option>
    </Select>
  );
};

const shuffle = <T,>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * i);
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }

  return arr;
};

const wait = (time: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), time);
  });

export const AsyncSingleSelectStory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<string[] | null>(null);
  const [selectValue, setSelectValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      // async request imitation
      await wait(3000);
      setOptions(shuffle(Array.from({ length: 5 }).map((_, ind) => String(ind))).slice(0, getRandomInt(2, 4)));
      setIsLoading(false);
    })();
  }, []);

  const emptyMessage = !options ? 'Options is loading...' : undefined;

  return (
    <Select
      mode="search"
      value={selectValue}
      isLoading={isLoading}
      onChange={onChange}
      emptyMessage={emptyMessage}
      placeholder="Placeholder"
    >
      {options?.map((value) => (
        <Option key={value} value={value}>
          {value}
        </Option>
      ))}
    </Select>
  );
};

export const AsyncMultipleSelectStory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<string[] | null>(null);
  const [selectValue, setSelectValue] = useState<string[]>([]);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValues = Array.from(e.target.selectedOptions).map((option) => option.value);
    setSelectValue(newValues);
  };

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return setOptions(null);

    setIsLoading(true);

    // async request imitation
    await wait(1500);
    setOptions(shuffle(Array.from({ length: 5 }).map((_, ind) => String(ind))).slice(0, getRandomInt(1, 3)));
    setIsLoading(false);
  };

  const emptyMessage = !options ? 'Enter your string to search' : undefined;

  return (
    <Select
      mode="search"
      multiple
      value={selectValue}
      isLoading={isLoading}
      defaultHighlighted={false}
      onChange={onChange}
      emptyMessage={emptyMessage}
      placeholder="Start typing"
      onInputChange={onInputChange}
    >
      {options?.map((value) => (
        <Option key={value} value={value}>
          {value}
        </Option>
      ))}
    </Select>
  );
};
