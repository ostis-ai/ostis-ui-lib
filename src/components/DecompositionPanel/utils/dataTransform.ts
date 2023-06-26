import { Decomposition, ITransformedDecomposition } from '@model/model';

export const dataTransform = (data: Decomposition): ITransformedDecomposition[] => {
  return Object.entries(data)
    .sort((left, right) => left[1].position - right[1].position)
    .map(([key, value]) => {
      return {
        id: Number(key),
        title: value.idtf,
        children: value.decomposition ? dataTransform(value.decomposition) : [],
        expanded: false,
        isLoading: false,
      };
    });
};
