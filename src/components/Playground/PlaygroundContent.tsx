import { ReactNode, useEffect } from 'react';

import { usePlaygroundContent } from './usePlayground';

type Props = {
  children: (props: Record<string, any>) => ReactNode;
};

export const PlaygroundContent = ({ children }: Props) => {
  const { onUpdate, values } = usePlaygroundContent();

  useEffect(() => {
    onUpdate(children(values));
  }, [children, onUpdate, values]);

  return null;
};
