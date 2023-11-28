import { tree1 } from './mock';
import { Scn } from './Scn';

export const ScnStory = () => {
  const onAskQuestion = () => {
    return null;
  };

  return <Scn tree={tree1} question={11} scgUrl="" onAskQuestion={onAskQuestion} />;
};
