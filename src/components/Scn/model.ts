export type TLinkFormat =
  | 'format_txt'
  | 'format_large_txt'
  | 'format_html'
  | 'format_github_source_link'
  | 'format_pdf'
  | 'format_png'
  | null;

export interface IScnNode {
  addr: number;
  idtf: string | null;
  type: number;
  content?: string | null;
  contentType?: TLinkFormat;
  sourceNode?: INodeShort | null;
  targetNode?: INodeShort | null;
  children?: IScnChild[] | null;
  struct?: IScnNode;
}

export interface IScnChild {
  arcs: IArc[];
  modifiers: IModifier[] | null;
  linkedNodes: IScnNode[];
}

interface IArc {
  addr: number;
  idtf: string | null;
  type: number;
  direction: 'left' | 'right';
}

interface IModifier {
  addr: number;
  idtf: string | null;
  type: number;
  modifierArcs: INodeShort[];
}

interface INodeShort {
  addr: number;
  idtf: string | null;
  type: number;
  content?: string | null;
}
