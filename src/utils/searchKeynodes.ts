import { SnakeToCamelCase } from '@model/utils';
import { ScAddr, ScClient, ScType } from 'ts-sc-client';

import { snakeToCamelCase } from './snakeToCamelCase';

export type TsearchKeynodes = <K extends [string, ...string[]]>(...keynodes: K) => Promise<KeynodesToObject<K>>;

type KeynodesToObject<T extends string[]> = string[] extends T
  ? Record<string, ScAddr>
  : T extends [infer First, ...infer Rest]
  ? Rest extends [string, ...string[]]
    ? First extends string
      ? Record<SnakeToCamelCase<First>, ScAddr> & KeynodesToObject<Rest>
      : KeynodesToObject<Rest>
    : First extends string
    ? Record<SnakeToCamelCase<First>, ScAddr>
    : Record<string, never>
  : Record<string, never>;

const DEFAULT_CACHE_SIZE = 5000;

const shiftMap = (map: Map<any, any>, to = 1) => {
  if (to < 1) return;

  let isDone = false;
  let ind = 0;
  const mapIterator = map.keys();
  while (ind < to && !isDone) {
    const elem = mapIterator.next();
    isDone = !!elem.done;
    map.delete(elem.value);
    ind++;
  }
};

export const searchKeynodesBuilder = (client: ScClient, cacheSize = DEFAULT_CACHE_SIZE): TsearchKeynodes => {
  const cache = new Map<string, ScAddr>();

  return async (...keynodes) => {
    const newKeynodes = keynodes
      .filter((keynode) => !cache.get(keynode))
      .map((keynode) => ({ id: keynode, type: ScType.ConstNode }));
    const cacheKeynodes = keynodes.filter((keynode) => cache.get(keynode));

    const overflow = cache.size + newKeynodes.length - cacheSize;

    if (overflow > 0) shiftMap(cache, overflow);

    const foundKeynodes = newKeynodes.length ? await client.resolveKeynodes(newKeynodes) : [];

    const foundKeynodesEntries = Object.entries(foundKeynodes);
    const cacheKeynodesEntries = cacheKeynodes.map((keynode) => [keynode, cache.get(keynode)]);

    foundKeynodesEntries.forEach(([key, value]) => cache.set(key, value));

    const keynodesEntries = [...foundKeynodesEntries, ...cacheKeynodesEntries];
    const transformedEntries = keynodesEntries.map(([key, value]) => [snakeToCamelCase(key as string), value]);
    return Object.fromEntries(transformedEntries);
  };
};
