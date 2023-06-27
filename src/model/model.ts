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

export interface IInputValidation {
  login: string;
  password: string;
}

export interface ICorrectUser {
  login: string;
  password: string;
}

export interface IDataBase {
  addr: number;
  name: string;
}

export interface IUserData {
  login: string;
  sc_addr: number;
  is_admin: number;
  can_edit: number;
  avatar: string | undefined;
  has_entered: boolean;
  first_time: number;
  public_url: string;
}

export interface IKeyValueDescription {
  value: string;
  key: string;
  description: string;
}

export interface INestedKeyValueDescription {
  value: string | INestedKeyValueDescription[];
  key: string;
  description: string;
}

export interface IDecompositionItem {
  sectionName: string;
}
