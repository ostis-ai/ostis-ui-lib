import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

import Search from './assets/Search.svg';
import * as Styled from './styled';

/**
 * @deprecated style Input component
 */
export const InputSearch = forwardRef(
  (props: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return <Styled.Search {...props} ref={ref} left={<Search />} />;
  },
);

InputSearch.displayName = 'InputSearch';
