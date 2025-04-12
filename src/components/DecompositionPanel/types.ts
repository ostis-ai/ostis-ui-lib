export interface ITransformedDecomposition {
  id: number;
  title: string;
  children: ITransformedDecomposition[];
  expanded: boolean;
  isLoading: boolean;
}

export type Decomposition = Record<
  number,
  {
    idtf: string;
    decomposition: Decomposition;
    position: number;
  }
>;

export interface IDecompositionItem {
  sectionName: string;
}

export type TAddDecompositionItemCallBack = (parentID: string, data: IDecompositionItem) => Promise<number | null>;

export type TGetDecompositionCallback = () => Promise<Decomposition | null>;

export type TEditDecompositionItemCallback = (id: number, value: string) => Promise<boolean | null>;

export type TDeleteDecompositionItemCallback = (parentID: string, id: string) => Promise<number | null>;

export interface IDecompositionContext {
  isMenuListLoading: boolean;
  setIsMenuListLoading: React.Dispatch<React.SetStateAction<boolean>>;
  menuList: ITransformedDecomposition | null;
  setMenuList: React.Dispatch<React.SetStateAction<ITransformedDecomposition | null>>;
  isAddInputShow: boolean;
  setIsAddInputShow: React.Dispatch<React.SetStateAction<boolean>>;
  addInputValue: string;
  setAddInputValue: React.Dispatch<React.SetStateAction<string>>;
  onToggle: (id: number) => void;
  onToggleShowItem: (id: number) => void;
  onAdd: (id: number, value: string, elemID: number) => Promise<void>;
  onEdit: (id: number, value: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onAddClick: () => void;
}
