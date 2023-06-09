import { createContext, PropsWithChildren, useContext } from 'react';

interface IContext {
  onExecuteCommand: (addr?: string | number, command?: string | number) => void;
}

const CommandContext = createContext<IContext>({} as IContext);

export const useCommandContext = () => useContext(CommandContext);

export const CommandProvider = ({ children, ...rest }: PropsWithChildren<IContext>) => {
  return <CommandContext.Provider value={rest}>{children}</CommandContext.Provider>;
};
