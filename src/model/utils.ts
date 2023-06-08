export type SnakeToCamelCase<T extends string> = string extends T
  ? string
  : T extends `${infer Start}_${infer Letter}${infer Rest}`
  ? `${Start}${Uppercase<Letter>}${SnakeToCamelCase<Rest>}`
  : T extends `${infer Str}`
  ? `${Str}`
  : '';
