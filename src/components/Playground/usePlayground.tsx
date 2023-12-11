import { ReactNode } from 'react';
import { createSmartContext } from '@utils/createSmartContext';

type Context = {
  onAddValue: (name: string, value: string | boolean | number) => void;
};

export const [PlaygroundProvider, usePlayground] = createSmartContext<Context>({} as Context);

type ContentContext = {
  onUpdate: (content: ReactNode) => void;
  values: Record<string, any>;
};

export const [PlaygroundContentProvider, usePlaygroundContent] = createSmartContext<ContentContext>(
  {} as ContentContext,
);
