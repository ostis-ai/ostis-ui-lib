import { InputV2 } from '@components/InputV2';
import styled from 'styled-components';

export const Search = styled(InputV2)`
  & > input {
    border: 1px solid white;

    &:hover,
    &:focus {
      border: 1px solid #d7e6eb;
    }

    &:disabled {
      border: 1px solid white;
      background: none;

      &::placeholder {
        color: #c0c0c0;
      }
    }
  }
`;
