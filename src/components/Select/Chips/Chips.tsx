import { isValidElement, MouseEvent, PropsWithChildren, ReactNode, useRef } from 'react';

import type { IChipProps, IConstantOption } from '../types';
import { preventDefault } from '../utils';

import { ChipBox, CounterChipWrap, ShadowCounterChip, StyledChip, StyledCounterChip } from './styled';

interface IMultipleChipsProps {
  options: IConstantOption[];
  shouldShowCount: boolean;
  disabled?: boolean;
  onChipRemove: (value: string) => void;
  onChipClick?: (evt: MouseEvent) => void;
}

interface ICounterChipsProps {
  count: number;
  onClick?: (evt: MouseEvent) => void;
  disabled?: boolean;
}

const CounterChip = ({ count, onClick, disabled }: PropsWithChildren<ICounterChipsProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  if (!count) return <ShadowCounterChip />;

  return (
    <CounterChipWrap onClick={onClick} ref={ref}>
      <StyledCounterChip disabled={disabled}>+{count}</StyledCounterChip>
    </CounterChipWrap>
  );
};

interface IChipWrapperProps {
  option: IConstantOption;
  className?: string;
  disabled?: boolean;
  onChipRemove: (value: string) => void;
  onClick?: (evt: MouseEvent) => void;
}

const ChipWrapper = ({ className, option, disabled: disabledFromProps, onClick, onChipRemove }: IChipWrapperProps) => {
  const disabledFromMeta = getChipMeta(option, onChipRemove).disabled;
  const disabled = disabledFromMeta || disabledFromProps;
  return (
    <StyledChip
      className={className}
      onClick={onClick}
      onClose={getChipMeta(option, onChipRemove).onClose}
      disabled={disabled}
    >
      {getChipMeta(option, onChipRemove).children}
    </StyledChip>
  );
};

const chipIsChipMeta = (chip: IChipProps | ReactNode): chip is IChipProps =>
  typeof chip === 'object' && chip !== null && !isValidElement(chip);

const getChipMeta = ({ value, disabled, renderChip }: IConstantOption, onChipRemove: (value: string) => void) => {
  const chip = renderChip();
  return chipIsChipMeta(chip)
    ? { ...chip, onClose: () => chip.onClose?.({ value, disabled }) }
    : { disabled, onClose: () => onChipRemove(value), children: chip };
};

export const Chips = ({ options, shouldShowCount, disabled, onChipClick, onChipRemove }: IMultipleChipsProps) => (
  <>
    {options.map((option, optionInd) => (
      <ChipBox key={option.value} onMouseDown={preventDefault}>
        <ChipWrapper
          className="chip"
          option={option}
          onClick={onChipClick}
          onChipRemove={onChipRemove}
          disabled={disabled}
        />
        {shouldShowCount && (
          <CounterChip onClick={onChipClick} count={options.length - optionInd - 1} disabled={disabled}>
            {options.slice(optionInd + 1).map((innerOption) => (
              <ChipWrapper
                key={innerOption.value}
                option={innerOption}
                onClick={onChipClick}
                onChipRemove={onChipRemove}
                disabled={disabled}
              />
            ))}
          </CounterChip>
        )}
        {!shouldShowCount && <ShadowCounterChip />}
      </ChipBox>
    ))}
  </>
);
