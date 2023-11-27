import { PropsWithChildren } from 'react';
import { Expandable } from '@components/Expandable';
import { useBooleanState } from '@hooks/useBooleanState';
import styled, { css } from 'styled-components';

import ChevronDown from './ChevronDown.svg';

const HeaderWrapper = styled.div`
  display: flex;
  padding: 4px;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    path {
      fill: rgb(93, 143, 239);
    }
  }
`;

const Content = styled.div`
  padding-left: 20px;
`;

const ChevronDownWrapper = styled.div<{ expanded: boolean }>`
  display: flex;
  justify-content: center;
  margin-left: auto;
  transform: rotate(0);
  transition: transform ease 0.3s;

  ${({ expanded }) =>
    expanded &&
    css`
      transform: rotate(180deg);
    `}
`;

type Props = {
  header: string;
  expanded?: boolean;
};

export const ContentWithHeader = ({ header, expanded: outerExpanded = true, children }: PropsWithChildren<Props>) => {
  const [expanded, , , onToggleExpanded] = useBooleanState(outerExpanded, {
    updateable: true,
  });

  return (
    <div>
      <HeaderWrapper onClick={onToggleExpanded}>
        <span>{header}</span>
        <ChevronDownWrapper expanded={expanded}>
          <ChevronDown width="24" height="24" />
        </ChevronDownWrapper>
      </HeaderWrapper>
      <Expandable expanded={expanded}>
        <Content>{children}</Content>
      </Expandable>
    </div>
  );
};
