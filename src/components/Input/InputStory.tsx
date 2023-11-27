import { PropsWithChildren } from 'react';

import { Input } from './Input';

const Story = ({ children }: PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>;
};

export const InputStory = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '350px 350px', gap: 30 }}>
    <Story>
      <Input placeholder="Логин*" />
      <Input placeholder="Логин*" value="Логин" />
      <Input placeholder="Логин*" value="Логин" status="error" />
      <Input placeholder="Логин*" disabled />
      <Input placeholder="Логин*" value="Логин" disabled />
    </Story>
    <Story>
      <Input placeholder="Поиск..." isSearch />
      <Input placeholder="Поиск..." value="Текст" isSearch />
      <Input placeholder="Поиск..." disabled isSearch />
    </Story>
    <div />
    <Story>
      <Input type="password" placeholder="Пароль*" />
      <Input type="password" placeholder="Пароль*" value="Пароль" />
      <Input type="password" placeholder="Пароль*" value="Пароль" status="error" />
      <Input type="password" placeholder="Пароль*" value="Пароль" disabled />
    </Story>
  </div>
);
