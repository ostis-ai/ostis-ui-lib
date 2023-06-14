import { createContext, PropsWithChildren, useContext } from 'react';

export type TOnAskQuestion = (addr: number) => number | null | Promise<number | null>;

export interface IScnContext {
  scgUrl: string;
  onAskQuestion: TOnAskQuestion;
}

const SCnContext = createContext<IScnContext>({} as IScnContext);

export const useScnContext = () => useContext(SCnContext);

export const ScnProvider = ({ children, ...rest }: PropsWithChildren<IScnContext>) => {
  return <SCnContext.Provider value={rest}>{children}</SCnContext.Provider>;
};
