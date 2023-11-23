import { HTMLAttributes, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { useDropDownSearchSelectContext, useOptionContext } from '../useSearchSelectContext';
import { getTextHighlightMeta } from '../utils';

const Panel = styled.div`
  color: inherit;
`;

const HiglightedText = styled.span`
  font-weight: 500;
`;

interface TextHighlightPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: string;
}

export const Highlight = ({ children = '', ...props }: TextHighlightPanelProps) => {
  const selectContext = useDropDownSearchSelectContext();
  const { onAddTextToHighlight } = useOptionContext();

  const searchValue = selectContext?.searchValue || '';

  const { chunks, parts } = useMemo(
    () => getTextHighlightMeta(children, searchValue, selectContext?.highlightFormat),
    [children, searchValue, selectContext?.highlightFormat],
  );

  useEffect(() => {
    onAddTextToHighlight(children);
  }, [onAddTextToHighlight, children]);

  return (
    <Panel {...props} className={props.className} title={children}>
      {parts.map((part, i) =>
        chunks.includes(part.toLowerCase()) ? <HiglightedText key={i}>{part}</HiglightedText> : part,
      )}
    </Panel>
  );
};
