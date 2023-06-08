import { TTexts } from './types';
import { useTranslate } from './useTranslate';

interface IProps {
  children: TTexts;
}

export const Translate = ({ children }: IProps) => {
  const translate = useTranslate();

  return <>{translate(children)}</>;
};
