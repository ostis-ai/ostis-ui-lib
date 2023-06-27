import styled from 'styled-components';

import { Textarea } from '../../../Textarea';

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 8px;

  width: 100%;
  min-height: 40px;

  padding: 8px 0 8px 6px;
`;

export const StyledTextarea = styled(Textarea)`
  height: 28px;

  overflow: hidden;
`;
