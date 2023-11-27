import { Textarea } from './Textarea';

export const TextareaStory = () => {
  return (
    <>
      <Textarea />
      <Textarea status="error" />
      <Textarea disabled />
    </>
  );
};
