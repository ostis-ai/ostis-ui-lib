import { PropsWithChildren } from 'react';
import { Spinner } from '@components/Spinner';

import { Button } from './';
import Add from './icons/Add.svg';

const Story = ({ children }: PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 10 }}>{children}</div>;
};

export const ButtonStory = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr', gap: 30 }}>
    <span />
    <span>Primary</span>
    <span>Secondary</span>
    <span>Large</span>
    <Story>
      <Button size="lg">Войти</Button>
      <Button size="lg" disabled>
        Войти
      </Button>
    </Story>
    <Story />
    <span>Medium</span>
    <Story>
      <Button size="md">Кнопка</Button>
      <Button size="md">
        <Spinner appearance="#ffffff" size={26} />
        Кнопка
      </Button>
      <Button size="md">
        <Spinner appearance="#ffffff" size={26} />
      </Button>
      <Button size="md" disabled>
        Кнопка
      </Button>
      <Button size="md" disabled>
        <Spinner appearance="#ffffff" size={26} />
        Кнопка
      </Button>
      <Button size="md" disabled>
        <Spinner appearance="#ffffff" size={26} />
      </Button>
    </Story>
    <Story>
      <Button color="secondary" size="md">
        Кнопка
      </Button>
      <Button color="secondary" size="md">
        <Add />
        Кнопка
      </Button>
      <Button color="secondary" size="md">
        <Add />
      </Button>
      <Button color="secondary" size="md" disabled>
        Кнопка
      </Button>
      <Button color="secondary" size="md" disabled>
        <Add />
        Кнопка
      </Button>
      <Button color="secondary" size="md" disabled>
        <Add />
      </Button>
    </Story>
    <span>Small</span>
    <Story>
      <Button size="sm">Кнопка</Button>
      <Button size="sm" disabled>
        Кнопка
      </Button>
    </Story>
    <Story>
      <Button color="secondary" size="sm">
        Кнопка
      </Button>
      <Button color="secondary" size="sm" disabled>
        Кнопка
      </Button>
    </Story>
  </div>
);
