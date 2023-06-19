export interface IWindowEventData {
  type: string;
  payload?: Record<string, any>;
}

export const enum EWindowEvents {
  confirmDelete = 'confirmDelete',
  updateScg = 'updateScg',
  openFragment = 'openFragment',
}
