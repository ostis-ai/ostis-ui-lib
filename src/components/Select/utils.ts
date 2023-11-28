import type { BaseSyntheticEvent } from 'react';

import type { HighlightFormat } from './types';

export const scrollToNotVisibleELem = (elem: HTMLElement, scrollElem: HTMLElement) => {
  const offsetFromScrollWrap = elem.offsetTop - scrollElem.offsetTop;
  const overTop = offsetFromScrollWrap < scrollElem.scrollTop;
  const overBottom = offsetFromScrollWrap + elem.clientHeight > scrollElem.scrollTop + scrollElem.clientHeight;

  if (overTop) {
    scrollElem.scrollTop = offsetFromScrollWrap;
  }
  if (overBottom) {
    scrollElem.scrollTop = offsetFromScrollWrap + elem.clientHeight - scrollElem.clientHeight;
  }
};

export const getTextHighlightMeta = (text = '', highlight = '', highlightFormat: HighlightFormat = 'word') => {
  const splitedHighlight = highlightFormat === 'word' ? highlight.split(' ') : [highlight];
  const chunks = splitedHighlight.filter(Boolean).map((chunk) => chunk.toLowerCase());

  const specialCaracters = ['[', ']', '\\', '^', '$', '.', '|', '?', '*', '+', '(', ')'];

  const pattern = chunks
    .map((chunk) => {
      const chunkForRegExp = chunk
        .split('')
        .map((letter) => (specialCaracters.includes(letter) ? `\\${letter}` : letter))
        .join('');
      return `(${chunkForRegExp})?`;
    })
    .join('');

  const parts = text.split(new RegExp(pattern, 'gi')).filter(Boolean);

  const shouldHiglight = !highlight ? true : parts.some((part) => chunks.includes(part.toLowerCase()));

  return { shouldHiglight, parts, chunks };
};

export const preventDefault = (e: BaseSyntheticEvent) => e.preventDefault();

interface InputData {
  value?: string;
  selectionStart?: number | null;
  selectionEnd?: number | null;
}

function isInputDataDifferent(data1: InputData, data2: InputData): boolean {
  return (
    data1.value !== data2.value ||
    data1.selectionStart !== data2.selectionStart ||
    data1.selectionEnd !== data2.selectionEnd
  );
}

export function changeInputData(input: HTMLInputElement | HTMLTextAreaElement, toChangeData: InputData) {
  const { value = input.value, selectionStart, selectionEnd } = toChangeData;

  if (isInputDataDifferent(input, { value, selectionStart, selectionEnd })) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value')?.set;
    nativeInputValueSetter?.call(input, value);

    input.setSelectionRange(selectionStart || 0, selectionEnd || 0);

    // IE fix: event dispatch
    let event;
    if (typeof Event === 'function') {
      event = new Event('input', { bubbles: true });
    } else {
      event = document.createEvent('Event');
      event.initEvent('input', true, true);
    }

    input.dispatchEvent(event);
  }
}
