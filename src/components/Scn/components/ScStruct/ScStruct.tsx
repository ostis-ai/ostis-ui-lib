import { useCallback, useEffect, useState } from 'react';
import { IScnNode } from '@components/Scn';
import { TScLanguageTab } from '@components/SwitchScgScn';
import { SPINER_COLOR } from '@model/constants';

import { useScnContext } from '../../ScnContext';
import { ScnElement } from '../ScnElement';

import { Struct, StyledScg, StyledSpinner, StyledSwitchScgScn } from './styled';

interface IProps {
  tree: IScnNode;
}

export const ScStruct = ({ tree }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState<number | null>(null);
  const [tab, setTab] = useState<TScLanguageTab>('scn');

  const { onAskQuestion, scgUrl } = useScnContext();

  const getQuestion = useCallback(async () => {
    setIsLoading(true);
    const question = await onAskQuestion(tree.addr);
    setIsLoading(false);
    setQuestion(question);
  }, [onAskQuestion, tree.addr]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  const showScg = tab === 'scg';
  const renderScg = showScg && !!question && !isLoading;
  return (
    <Struct isScg={showScg}>
      <StyledSwitchScgScn tab={tab} onTabClick={setTab} />
      {!showScg && <ScnElement tree={tree} isRoot />}
      <StyledScg url={scgUrl} question={question || undefined} show={renderScg} readonly />
      {showScg && isLoading && <StyledSpinner appearance={SPINER_COLOR} />}
    </Struct>
  );
};
