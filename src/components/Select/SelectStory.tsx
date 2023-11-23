import { Grid, GridItem } from '@components/Grid';
import { StoryItem } from '@components/Storybook/StoryItem';
import styled from 'styled-components';

import { Option } from './Option';
import { Select } from './Select';

const Title = styled.div`
  margin: 16px 0 8px;
  font-family: 'Roboto';
  font-size: 24px;
  line-height: 28px;
`;

export const SelectStory = () => (
  <StoryItem path="Select">
    <Grid>
      <GridItem size={6}>
        <Grid>
          <GridItem>
            <Title>Простой селект</Title>
            <Select>
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
      </GridItem>
      <GridItem size={6}>
        <Grid>
          <GridItem>
            <Title>Мультиселект</Title>
            <Select multiple>
              <Option value="1">Значение 1</Option>
              <Option value="2">Значение 2</Option>
            </Select>
          </GridItem>
          <GridItem>
            <Title>Мультиселект с поиском</Title>
            <Select mode="search" value={Array.from({ length: 10 }).map((_, ind) => String(ind))} multiple>
              {Array.from({ length: 20 }).map((_, ind) => (
                <Option value={String(ind)} key={ind}>
                  Значение {ind}
                </Option>
              ))}
            </Select>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  </StoryItem>
);
