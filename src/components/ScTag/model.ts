export interface IContextItem {
  addr: number;
}

export interface IContext {
  getContextItems: (addr?: number | string) => Promise<number[] | null>;
  onFixArgument?: (addr?: number | string) => void;
}
