import { Tooltip } from '@components/Tooltip';
import styled, { css } from 'styled-components';

import ScgSwitch from './icons/scg.svg';
import ScnSwitch from './icons/scn.svg';

export type TScLanguageTab = 'scn' | 'scg';

const SwitchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const Tab = styled.div<{ isActive: boolean }>`
  font-size: 26px;
  font-weight: 400;
  color: #c0c0c0;

  cursor: pointer;

  &:hover {
    background: #e9f3f6;
    path {
      fill: #5896c0;
    }
  }

  padding: 4px 8px;

  border-radius: 4px;

  path {
    fill: #c0c0c0;
  }

  ${(props) =>
    props.isActive &&
    css`
      background: #f8f8f8;

      path {
        fill: #5896c0;
      }
    `}
`;

const Divider = styled.span`
  margin: 0 4px;

  border-left: 1px solid #c0c0c0;
`;

export interface ISwitchScgScnProps {
  className?: string;
  tab: TScLanguageTab;
  onTabClick: (tab: TScLanguageTab) => void;
}

export const SwitchScgScn = ({ tab, className, onTabClick }: ISwitchScgScnProps) => {
  const onClick = (newTab: TScLanguageTab) => () => {
    onTabClick(newTab);
  };

  return (
    <SwitchWrap className={className}>
      <Tabs>
        <Tooltip title={'SCn-код'}>
          <Tab isActive={tab === 'scn'} onClick={onClick('scn')}>
            <ScnSwitch />
          </Tab>
        </Tooltip>
        <Divider />
        <Tooltip title={'SCg-код'} placement="bottom-end">
          <Tab isActive={tab === 'scg'} onClick={onClick('scg')}>
            <ScgSwitch />
          </Tab>
        </Tooltip>
      </Tabs>
    </SwitchWrap>
  );
};
