import { createContext } from 'react';

import { IDecompositionContext } from './types';

const defaultContext = {} as IDecompositionContext;

export const DecompositionContext = createContext<IDecompositionContext>(defaultContext);
