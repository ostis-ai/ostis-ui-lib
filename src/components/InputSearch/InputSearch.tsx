import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

import Search from './assets/Search.svg';
import * as Styled from './styled';

const InputSearch = (props: InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
  return <Styled.Search {...props} ref={ref} left={<Search />} />;
};

export default forwardRef(InputSearch);
