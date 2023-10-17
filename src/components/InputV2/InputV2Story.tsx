import { PropsWithChildren } from 'react';
import { InputPassword } from '@components/InputPassword';
import { InputSearch } from '@components/InputSearch';
import { StoryItem } from '@components/Storybook/StoryItem';

import { InputV2 } from '.';

const Story = ({ children }: PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>;
};

export const InputV2Story = () => (
  <StoryItem path="Input V2">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <Story>
        <InputV2 placeholder="Логин*" />
        <InputV2 placeholder="Логин*" value="Логин" />
        <InputV2 placeholder="Логин*" value="Логин" error="Ошибка" />
        <InputV2 placeholder="Логин*" disabled />
        <InputV2 placeholder="Логин*" value="Логин" disabled />
      </Story>
      <Story>
        <InputSearch placeholder="Поиск..." />
        <InputSearch placeholder="Поиск..." value="Текст" />
        <InputSearch placeholder="Поиск..." disabled />
      </Story>
      <div />
      <Story>
        <InputPassword placeholder="Пароль*" />
        <InputPassword placeholder="Пароль*" value="Пароль" />
        <InputPassword placeholder="Пароль*" value="Пароль" error="Неверный логин или пароль" />
        <InputPassword placeholder="Пароль*" value="Пароль" disabled />
      </Story>
    </div>
  </StoryItem>
);
