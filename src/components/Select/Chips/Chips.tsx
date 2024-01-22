import { MouseEvent, useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { IConstantOption } from '../types';
import { preventDefault } from '../utils';

import { ChipBox, CounterChip, OptionChipWrapper } from './styled';

interface IMultipleChipsProps {
  options: IConstantOption[];
  disabled?: boolean;
  onChipRemove?: (value: string) => void;
}

interface IOptionChipProps {
  option: IConstantOption;
  className?: string;
  disabled?: boolean;
  chipVissible?: boolean;
  counterVissible?: boolean;
  restChips: number;
  onChipRemove?: (value: string) => void;
  onVisibiltyChange?: (inView: boolean) => void;
}

const OptionChip = ({
  className,
  option,
  restChips,
  chipVissible = false,
  counterVissible = false,
  disabled,
  onVisibiltyChange,
  onChipRemove,
}: IOptionChipProps) => {
  const [ref] = useInView({ threshold: 1, onChange: onVisibiltyChange });

  const onClose = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onChipRemove?.(option.value);
    },
    [onChipRemove, option.value],
  );

  return (
    <OptionChipWrapper className={className} ref={ref} $vissible={chipVissible}>
      {option.renderValue({ onClose: onChipRemove ? onClose : undefined })}
      <CounterChip disabled={disabled} size="l" $vissible={counterVissible}>
        +{restChips}
      </CounterChip>
    </OptionChipWrapper>
  );
};

export const Chips = ({ options, disabled, onChipRemove }: IMultipleChipsProps) => {
  /**
   * Firstly chips are rendered with zero opacity. Then every chip return if it is shown
   * We start showing them when there is no invisible chips or first inisible is found
   */
  const [isInnitialized, setIsInnitialized] = useState(false);
  const [invisibleELems, setInvisibleELems] = useState<string[]>([]);

  const onVisibiltyChange = (value: string) => (inView: boolean) => {
    if (value === options[options.length - 1].value) setIsInnitialized(true);

    if (inView) {
      return setInvisibleELems((prev) => {
        return prev.filter((prevValue) => prevValue !== value);
      });
    }

    setInvisibleELems((prev) => {
      if (prev.includes(value)) return prev;
      return [...prev, value];
    });
  };

  const firstInvisibleOptionIndex = options.findIndex(({ value }) => invisibleELems.includes(value));

  const isFirstInvisbleOptionFound = firstInvisibleOptionIndex !== -1;

  // We should show 2 more values with opacity 0 for intersectionObserver to know if they are visible before showing them
  const numberExtraOptionsToRender = 2;

  const optionsToRender = isFirstInvisbleOptionFound
    ? options.slice(0, firstInvisibleOptionIndex + numberExtraOptionsToRender)
    : options;

  const isAllChipsInitiallyVisible = isInnitialized && !invisibleELems.length;

  const getIsChipVisible = (value: string) => {
    return isAllChipsInitiallyVisible || (isFirstInvisbleOptionFound && !invisibleELems.includes(value));
  };

  const getIsCounterVissible = (nextValue?: string) => {
    // If there is no nextValue, current chip is last and there'i no need in counter
    if (!nextValue) return false;

    return !getIsChipVisible(nextValue);
  };

  return (
    <>
      {optionsToRender.map((option, ind) => {
        return (
          <ChipBox key={option.value} onMouseDown={preventDefault}>
            <OptionChip
              className="chip"
              option={option}
              onChipRemove={onChipRemove}
              onVisibiltyChange={onVisibiltyChange(option.value)}
              disabled={disabled}
              restChips={options.length - ind - 1}
              chipVissible={getIsChipVisible(option.value)}
              counterVissible={getIsCounterVissible(optionsToRender[ind + 1]?.value)}
            />
          </ChipBox>
        );
      })}
    </>
  );
};
