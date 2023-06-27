import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { DecompositionContext } from './consts';
import {
  ITransformedDecomposition,
  TAddDecompositionItemCallBack,
  TDeleteDecompositionItemCallback,
  TEditDecompositionItemCallback,
  TGetDecompositionCallback,
} from './types';
import { dataTransform } from './utils/dataTransform';
import { findParent, updateElem } from './utils/getElemPath';

interface IProps {
  getDecompositionCallback: TGetDecompositionCallback;
  addDecompositionItemCallBack: TAddDecompositionItemCallBack;
  editDecompositionItemCallback: TEditDecompositionItemCallback;
  deleteDecompositionItemCallback: TDeleteDecompositionItemCallback;
  children: ReactNode;
}

export const DecompositionProvider: FC<IProps> = ({
  getDecompositionCallback,
  addDecompositionItemCallBack,
  editDecompositionItemCallback,
  deleteDecompositionItemCallback,
  children,
}) => {
  const [isMenuListLoading, setIsMenuListLoading] = useState(true);
  const [menuList, setMenuList] = useState<ITransformedDecomposition | null>(null);
  const [isAddInputShow, setIsAddInputShow] = useState(false);
  const [addInputValue, setAddInputValue] = useState('');

  useEffect(() => {
    (async () => {
      const menu = await getDecompositionCallback();

      if (!menu) return;
      setMenuList(dataTransform(menu)[0]);
      setIsMenuListLoading(false);
    })();
  }, [getDecompositionCallback]);

  const onToggle = useCallback((id: number) => {
    setMenuList((prevState) => {
      if (!prevState) return null;

      return updateElem(prevState, id, (elem) => ({ ...elem, expanded: !elem.expanded }));
    });
  }, []);

  const onToggleShowItem = useCallback((id: number) => {
    setMenuList((prevState) => {
      if (!prevState) return null;

      return updateElem(prevState, id, (elem) => ({ ...elem, expanded: true }));
    });
  }, []);

  const onAdd = useCallback(
    async (id: number, value: string, elemID: number) => {
      if (elemID !== 1) {
        setMenuList((prevState) => {
          if (!prevState) return null;
          return updateElem(prevState, id, (elem) => ({
            ...elem,
            expanded: true,
            children: [...elem.children, { id: elemID, title: value, expanded: false, children: [], isLoading: true }],
          }));
        });

        const res = await addDecompositionItemCallBack(String(id), { sectionName: value });

        if (!res) return;

        return setMenuList((prevState) => {
          if (!prevState || !res) return null;
          return updateElem(prevState, elemID, (elem) => ({
            ...elem,
            id: Number(res.sc_addr),
            expanded: false,
            isLoading: false,
          }));
        });
      }

      setMenuList((prevState) => {
        if (!prevState) return null;
        return updateElem(prevState, id, (elem) => ({
          ...elem,
          expanded: true,
          children: [...elem.children, { id: elemID, title: value, expanded: false, children: [], isLoading: false }],
        }));
      });
    },
    [addDecompositionItemCallBack],
  );

  const onEdit = useCallback(
    async (id: number, value: string) => {
      await editDecompositionItemCallback(id, value);
    },
    [editDecompositionItemCallback],
  );

  const onDelete = useCallback(
    async (id: number) => {
      if (id === 1) {
        return setMenuList((prevState) => {
          if (!prevState) return null;

          const parent = findParent(prevState, id);

          if (!parent) return prevState;

          return updateElem(prevState, parent.id, (elem) => ({
            ...elem,
            children: elem.children.filter((item) => item.id !== Number(id)),
          }));
        });
      }

      if (!menuList) return;

      const parent = findParent(menuList, id);

      if (!parent) return;

      const deleteRes = await deleteDecompositionItemCallback(String(parent.id), String(id));

      if (!deleteRes) return;

      const deletedID = deleteRes.sc_addr;
      if (!deletedID) return;

      const newMenuList = updateElem(menuList, parent.id, (elem) => ({
        ...elem,
        children: elem.children.filter((item) => item.id !== Number(deletedID)),
      }));

      setMenuList(newMenuList);
    },
    [deleteDecompositionItemCallback, menuList],
  );

  const onAddClick = useCallback(() => {
    if (!menuList) return;

    onAdd(menuList.id, '', 1);
    setIsAddInputShow(true);
  }, [menuList, onAdd]);

  const contextValue = useMemo(
    () => ({
      isMenuListLoading,
      setIsMenuListLoading,
      menuList,
      setMenuList,
      isAddInputShow,
      setIsAddInputShow,
      addInputValue,
      setAddInputValue,
      onToggle,
      onToggleShowItem,
      onAdd,
      onEdit,
      onDelete,
      onAddClick,
    }),
    [
      isMenuListLoading,
      setIsMenuListLoading,
      menuList,
      setMenuList,
      isAddInputShow,
      setIsAddInputShow,
      addInputValue,
      setAddInputValue,
      onToggle,
      onToggleShowItem,
      onAdd,
      onEdit,
      onDelete,
      onAddClick,
    ],
  );

  return <DecompositionContext.Provider value={contextValue}>{children}</DecompositionContext.Provider>;
};
