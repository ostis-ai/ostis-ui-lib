import { tree1 } from './mock';
import { Scn } from './Scn';

export const ScnStory = () => {
  const onInitiateAction = () => {
    return null;
  };

  return <Scn tree={tree1} action={11} scgUrl="" onInitiateAction={onInitiateAction} />;
};
