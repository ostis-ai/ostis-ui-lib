import { ITransformedDecomposition } from '../types';

const getElemPath = (tree: ITransformedDecomposition, id: number): number[] => {
  if (tree.id === id) return [tree.id];

  for (const elem of tree.children) {
    const path = getElemPath(elem, id);
    if (path.length) return [tree.id, ...path];
  }
  return [];
};

const updateByPath = (
  tree: ITransformedDecomposition,
  paths: number[],
  id: number,
  cb: (elem: ITransformedDecomposition) => ITransformedDecomposition,
): ITransformedDecomposition => {
  if (!paths.includes(tree.id)) return tree;

  if (tree.id === id) return cb(tree);

  const innerUpdated = tree.children.some((child) => paths.includes(child.id));
  return {
    ...tree,
    children: innerUpdated ? tree.children.map((child) => updateByPath(child, paths, id, cb)) : tree.children,
  };
};

export const findParent = (tree: ITransformedDecomposition, id: number): ITransformedDecomposition | null => {
  if (tree.children.find((elem) => elem.id === id)) return tree;

  for (const child of tree.children) {
    const elem = findParent(child, id);

    if (elem) return elem;
  }

  return null;
};

export const updateElem = (
  tree: ITransformedDecomposition,
  id: number,
  cb: (elem: ITransformedDecomposition) => ITransformedDecomposition,
) => {
  const paths = getElemPath(tree, id);
  return updateByPath(tree, paths, id, cb);
};
