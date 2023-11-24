import { isValidElement, MouseEvent, ReactNode, useCallback, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { IChipProps, IConstantOption } from '../types';
import { preventDefault } from '../utils';

import { ChipBox, CounterChip, OptionChipWrapper, StyledChip } from './styled';

const chipIsChipMeta = (chip: IChipProps | ReactNode): chip is IChipProps =>
  typeof chip === 'object' && chip !== null && !isValidElement(chip);

const getChipMeta = ({ value, disabled, renderChip }: IConstantOption, onChipRemove: (value: string) => void) => {
  const chip = renderChip();
  return chipIsChipMeta(chip)
    ? { ...chip, onClose: () => chip.onClose?.({ value, disabled }) }
    : { disabled, onClose: () => onChipRemove(value), children: chip };
};

interface IMultipleChipsProps {
  options: IConstantOption[];
  disabled?: boolean;
  onChipRemove: (value: string) => void;
}

interface IOptionChipProps {
  option: IConstantOption;
  className?: string;
  disabled?: boolean;
  chipVissible?: boolean;
  counterVissible?: boolean;
  restChips: number;
  onChipRemove: (value: string) => void;
  onClick?: (evt: MouseEvent) => void;
  onVisibiltyChange?: (inView: boolean) => void;
}

const OptionChip = ({
  className,
  option,
  restChips,
  chipVissible = false,
  counterVissible = false,
  disabled: disabledFromProps,
  onVisibiltyChange,
  onClick,
  onChipRemove,
}: IOptionChipProps) => {
  const [ref] = useInView({ threshold: 1, onChange: onVisibiltyChange });

  const shipMeta = useMemo(() => getChipMeta(option, onChipRemove), [onChipRemove, option]);

  const disabled = shipMeta.disabled || disabledFromProps;

  const onClose = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      shipMeta.onClose();
    },
    [shipMeta],
  );

  return (
    <OptionChipWrapper className={className} ref={ref} $vissible={chipVissible}>
      <StyledChip onClick={onClick} onClose={onClose} disabled={disabled} size="l" $vissible={chipVissible}>
        {shipMeta.children}
      </StyledChip>
      <CounterChip disabled={disabled} size="l" $vissible={counterVissible}>
        +{restChips}
      </CounterChip>
    </OptionChipWrapper>
  );
};

export const Chips = ({ options, disabled, onChipRemove }: IMultipleChipsProps) => {
  /**
   * Сначала чипсы рендерятся невидимыми. После этого каждый чип возвращает виден ли он полностью.
   * Чипы начинают показываться, когда не нашлось ни одного невидимосого или первый видимый
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

  const optionsToRender = isFirstInvisbleOptionFound ? options.slice(0, firstInvisibleOptionIndex + 1) : options;
  const invisibleOptions = isFirstInvisbleOptionFound ? options.slice(firstInvisibleOptionIndex) : [];

  const isAllChipsInitiallyVisible = isInnitialized && !invisibleELems.length;

  return (
    <>
      {optionsToRender.map((option, ind) => (
        <ChipBox key={option.value} onMouseDown={preventDefault}>
          <OptionChip
            className="chip"
            option={option}
            onChipRemove={onChipRemove}
            onVisibiltyChange={onVisibiltyChange(option.value)}
            disabled={disabled}
            restChips={options.length - ind - 1}
            chipVissible={
              isAllChipsInitiallyVisible || (isFirstInvisbleOptionFound && !invisibleELems.includes(option.value))
            }
            counterVissible={
              !!invisibleOptions.length && ind === optionsToRender.length - 2 && ind !== optionsToRender.length - 1
            }
          />
        </ChipBox>
      ))}
    </>
  );
};
