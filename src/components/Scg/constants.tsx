import { Popup } from './styled';

export const confirmDeletePopupContent = (
  <Popup>
    Вы уверены, что хотите <b>удалить</b> выделенные элементы из базы знаний?
    <b>Это действие нельзя будет отменить после синхронизации изменений.</b>
  </Popup>
);

export const confirmClearScenePopupContent = (
  <Popup isClear>
    В результе этого действия из базы знаний будут <b>удалены</b> все элементы рабочего пространства.
    <br />
    <b>Это действие нельзя отменить.</b>
  </Popup>
);
