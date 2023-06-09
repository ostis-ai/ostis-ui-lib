import { SnakeToCamelCase } from '@model/utils';

export const snakeToCamelCase = <Str extends string>(str: Str): SnakeToCamelCase<Str> =>
  str.replace(/_(\w)/g, (_, p1) => p1.toUpperCase()) as SnakeToCamelCase<Str>;
