import { useRef } from 'react';
import { DropdownOption } from '@components/DropdownOption';
import { useBooleanState } from '@hooks/useBooleanState';
import { useClickOutside } from '@hooks/useClickOutside';

import { Dropdown } from './Dropdown';

export const DropdownStory = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropDownOpen, , onClose, toggleDropDown] = useBooleanState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside([ref, dropdownRef], onClose);
  return (
    <>
      <div
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          toggleDropDown();
        }}
      >
        Dropdown
      </div>

      {isDropDownOpen && (
        <Dropdown targetRef={ref} ref={dropdownRef} onMouseDown={(e) => e.preventDefault()}>
          <DropdownOption>First Option</DropdownOption>
          <DropdownOption>Second Option</DropdownOption>
        </Dropdown>
      )}
    </>
  );
};
