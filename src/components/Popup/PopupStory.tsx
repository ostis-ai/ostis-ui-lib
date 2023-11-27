import { useBooleanState } from '@hooks/useBooleanState';

import { Popup } from './Popup';

export const PopupStory = () => {
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
