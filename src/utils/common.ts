export const getRandomArrayElem = <T>(arr: readonly T[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
