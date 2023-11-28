import { ReactNode } from 'react';

export interface IStoryItem {
  header?: string;
  name: string;
  children: ReactNode;
}

export interface IStorybookContext {
  addStoryItem: (item: IStoryItem) => void;
  removeStoryItem: (path: string) => void;
}
