import { ReactNode } from 'react';

export interface IStoryItem {
  path: string;
  children: ReactNode;
}

export interface IStorybookContext {
  addStoryItem: (item: IStoryItem) => void;
  removeStoryItem: (path: string) => void;
}
