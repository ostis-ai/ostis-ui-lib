import { ChangeEvent, useLayoutEffect, useRef, useState } from 'react';
import { Grid, GridItem } from '@components/Grid';
import { useInView } from '@hooks/useInView';
import styled from 'styled-components';

import { Option } from './Option';
import { Select } from './Select';

const Title = styled.div`
  margin: 16px 0 8px;
  font-family: 'Roboto';
  font-size: 24px;
  line-height: 28px;
`;

// const Wrapper = styled.div`
//   width: 50%;
//   height: 300px;
//   border: 1px solid red;
//   overflow: hidden;
// `;

// const Inner = styled.div`
//   width: 500px;
//   height: 200px;
//   border: 1px solid blue;
// `;

// export const SelectStory = () => {
//   const [inView, setInView] = useState(false);

//   const ref = useRef(null);

//   useLayoutEffect(() => {
//     if (!ref.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const isVisible = entries[0].isIntersecting;
//         setInView(isVisible);
//       },
//       { threshold: 1 },
//     );
//     observer.observe(ref.current);
//   }, []);

//   return (
//     <Wrapper>
//       <Inner ref={ref} style={{ borderColor: inView ? 'gold' : 'blue' }} />
//     </Wrapper>
//   );
// };

// export const SelectStory = () => {
//   const [ref, inView] = useInView<HTMLDivElement, HTMLDivElement>({ threshold: 1 });

//   return (
//     <Wrapper>
//       <Inner ref={ref} style={{ borderColor: inView ? 'gold' : 'blue' }} />
//     </Wrapper>
//   );
// };

export const MultiSelectSearch = () => {
  const [selectValue, setSelectValue] = useState<string[]>(['1', '2', '3']);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValues = Array.from(e.target.selectedOptions).map((option) => option.value);
    setSelectValue(newValues);
  };

  return (
    <Select mode="search" multiple value={selectValue} onChange={onChange}>
      {Array.from({ length: 20 }).map((_, ind) => (
        <Option value={String(ind)} key={ind}>
          Значение {ind}
        </Option>
      ))}
    </Select>
  );
};

export const SelectStory = () => (
  <Grid>
    {/* <GridItem size={6}>
      <Grid>
        <GridItem>
          <Title>Простой селект 1</Title>
          <Select disabled>
            <Option value="1">Значение 1</Option>
            <Option value="2">Значение 2</Option>
          </Select>
        </GridItem>
        <GridItem>
          <Title>Селект с поиском</Title>
          <Select mode="search">
            <Option value="1">Значение 1</Option>
            <Option value="2">Значение 2</Option>
          </Select>
        </GridItem>
        <GridItem>
          <Title>Селект с произвольной версткой</Title>
          <Select mode="search">
            <Option value="1">
              <div style={{ height: '50px' }}>Значение 1</div>
            </Option>
            <Option value="2">
              <div style={{ height: '50px' }}>Значение 2</div>
            </Option>
          </Select>
        </GridItem>
      </Grid>
    </GridItem> */}
    <GridItem size={6}>
      <Grid>
        {/* <GridItem>
          <Title>Мультиселект</Title>
          <Select multiple>
            <Option value="1">Значение 1</Option>
            <Option value="2">Значение 2</Option>
          </Select>
        </GridItem> */}
        <GridItem>
          <Title>Мультиселект с поиском</Title>
          <MultiSelectSearch />
        </GridItem>
      </Grid>
    </GridItem>
  </Grid>
);
