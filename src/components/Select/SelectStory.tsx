import { ChangeEvent, useEffect, useState } from 'react';
import { Chip } from '@components/Chip';
import { Playground } from '@components/Playground/Playground';
import { PlaygroundContent } from '@components/Playground/PlaygroundContent';
import { PlaygroundRow } from '@components/Playground/PlaygroundRow';
import { getRandomInt } from '@utils/getRandomInt';
import styled from 'styled-components';

import { defaultEmptyMessage, defaultLoadingText } from './constants';
import { Option } from './Option';
import { Select } from './Select';

const BasicOptions = () => {
  return (
    <>
      <Option value="text1">This is text</Option>
      <Option value="text2">One more text</Option>
      <Option value="text3">Why cant we make one more option</Option>
      <Option value="big">Really big one really big one really big one really big one really big one</Option>
      {Array.from({ length: 15 }).map((_, ind) => (
        <Option key={ind} value={String(ind + 1)}>
          {ind + 1}
        </Option>
      ))}
    </>
  );
};

export const SelectPlaygroundStory = () => {
  return (
    <Playground>
      <PlaygroundContent>
        {(props) => (
          <Select {...props}>
            <BasicOptions />
          </Select>
        )}
      </PlaygroundContent>
      <PlaygroundRow name="mobile" type="boolean" description="Toggle for mobile select view" default="" />
      <PlaygroundRow
        name="renderedEmptyValue"
        type="input"
        description="Rendered value, when select value is empty or is not mathing with any option"
        default=""
      />
      <PlaygroundRow name="isLoading" type="boolean" description="Shows loading status" default={false} />
      <PlaygroundRow name="disabled" type="boolean" description="Is select disabled" default={false} />
      <PlaygroundRow
        name="mode"
        type="select"
        description="Select with or without search"
        default="select"
        options={['select', 'search']}
      />
      <PlaygroundRow
        name="loadingAppearance"
        type="select"
        description="Specifies loader appearance"
        default="input"
        options={['input', 'options']}
      />
      <PlaygroundRow
        name="loadingMessage"
        type="input"
        description="Message displayed in dropdown when isLoading is enabled and no options is present"
        default={defaultLoadingText}
      />
      <PlaygroundRow
        name="emptyMessage"
        type="input"
        description="Component in dropdown when no option is matching value in search input"
        default={defaultEmptyMessage}
      />
      <PlaygroundRow name="multiple" type="boolean" description="Makes select multiple" default={false} />
      <PlaygroundRow name="status" type="select" description="Visual status" options={['attention', 'error']} />
      <PlaygroundRow
        name="defaultHighlighted"
        type="boolean"
        description="By default, when text and only text is passed to Option children, depending on search input value options will be highlighted. This flag disables this logic"
      />
      <PlaygroundRow
        name="showCheckbox"
        type="boolean"
        default={true}
        description="Shows checkbox in option when multiple is true"
      />
      <PlaygroundRow
        name="defaultValue"
        type="input"
        description="Default value when select is in uncontrolled state"
      />
      <PlaygroundRow
        name="idleHeight"
        type="select"
        description="Specifies initial height in closed select. Can be used to initially show all checked options in multiple select"
        default="fixed"
        options={['full', 'fixed']}
      />
      <PlaygroundRow
        name="highlightFormat"
        type="select"
        description="Word - option text is splitted by words and searches in every word. Wholly - search by whole text"
        default="word"
        options={['word', 'wholly']}
      />
      <PlaygroundRow
        name="portalTargetRef"
        type="empty"
        description="Ref to position a portal. By default rendered befory closing body tag"
      />
    </Playground>
  );
};

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

export const SearchSelectStoryWithoutValuesRender = () => (
  <Select mode="search" placeholder="Searching without values render" withoutValuesRender={true}>
    <Option value="1">This is text</Option>
    <Option value="2">One more text</Option>
    <Option value="3">Why cant we make one more option</Option>
    <Option value="4">Option 1</Option>
    <Option value="5">Option 2</Option>
    <Option value="6">Option 3</Option>
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

export const MobileMultipleSelectStory = () => {
  const [selectValue, setSelectValue] = useState<string[]>(['1', '2', '3']);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValues = Array.from(e.target.selectedOptions).map((option) => option.value);
    setSelectValue(newValues);
  };

  return (
    <Select mode="search" multiple value={selectValue} onChange={onChange} placeholder="Placeholder" mobile>
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
