import { type ReactNode, useCallback, useState } from 'react';
import styled from 'styled-components';

import { PlaygroundContentProvider, PlaygroundProvider } from './usePlayground';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Rows = styled.div`
  border-top: 1px solid #ececec;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const ContentRows = styled.div`
  grid-column: span 4;
  max-height: 45vh;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const HeaderItem = styled.div`
  padding: 8px 4px;
  font-weight: bold;
  color: rgba(51, 51, 51, 0.75);
`;

type Props = {
  children: ReactNode;
};

export const Playground = ({ children }: Props) => {
  const [playgroundContent, setPlaygroundContent] = useState<ReactNode>(null);
  const [values, setValues] = useState<Record<string, any>>({});

  const onAddValue = useCallback((name: string, value: string | boolean | number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <PlaygroundProvider onAddValue={onAddValue}>
      <PlaygroundContentProvider onUpdate={setPlaygroundContent} values={values}>
        <Wrapper>
          <Content>{playgroundContent}</Content>
          <Rows>
            <HeaderItem>Name</HeaderItem>
            <HeaderItem>Description</HeaderItem>
            <HeaderItem>Default</HeaderItem>
            <HeaderItem>Control</HeaderItem>
            <ContentRows>{children}</ContentRows>
          </Rows>
        </Wrapper>
      </PlaygroundContentProvider>
    </PlaygroundProvider>
  );
};
