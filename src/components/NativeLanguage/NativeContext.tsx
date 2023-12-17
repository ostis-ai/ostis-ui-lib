import { createContext, PropsWithChildren, useContext } from 'react';

export type TOnAskQuestion = (addr: number) => number | null | Promise<number | null>;

export interface INativeContext {
  scgUrl: string;
  onAskQuestion: TOnAskQuestion;
}

const NativeContext = createContext<INativeContext>({} as INativeContext);

export const useNativeContext = () => useContext(NativeContext);

export const NativeProvider = ({ children, ...rest }: PropsWithChildren<INativeContext>) => {
  return <NativeContext.Provider value={rest}>{children}</NativeContext.Provider>;
};
