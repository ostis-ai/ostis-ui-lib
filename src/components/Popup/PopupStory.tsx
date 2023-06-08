import { StoryItem } from '@components/Storybook/StoryItem';
import { useBooleanState } from '@hooks/useBooleanState';

import { Popup } from './Popup';

const PopupIndex = () => {
  const [isPopupShown, showPopup, hidePopup] = useBooleanState(false);

  return (
    <>
      <p onClick={showPopup}>click to open Popup</p>
      {isPopupShown && (
        <Popup onClose={hidePopup}>
          <p>Click outside to close Popup</p>
        </Popup>
      )}
    </>
  );
};

export const PopupStory = () => {
  return (
    <StoryItem path="Popup">
      <PopupIndex />
    </StoryItem>
  );
};
