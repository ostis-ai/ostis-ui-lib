import { ScType } from 'ts-sc-client';

export const arcMap = {
  [ScType.EdgeUCommon.value]: { right: '↔', left: '↔' },
  [ScType.EdgeDCommon.value]: { right: '→', left: '←' },
  [ScType.EdgeAccess.value]: { right: '..∍', left: '∊..' },
  [ScType.ConstCommonEdge.value]: { right: '⇔', left: '⇔' },
  [ScType.EdgeUCommonVar.value]: { right: '⇐⇒', left: '⇐⇒' },
  [ScType.ConstCommonArc.value]: { right: '⇒', left: '⇐' },
  [ScType.VarCommonArc.value]: { right: '_⇒', left: '_⇐' },
  [ScType.ConstPermPosArc.value]: { right: '∍', left: '∊' },
  [ScType.EdgeAccessConstNegPerm.value]: { right: '∌', left: '∉' },
  [ScType.EdgeAccessConstFuzPerm.value]: { right: '/∍', left: '∊/' },
  [ScType.EdgeAccessConstPosTemp.value]: { right: '~∍', left: '∊~' },
  [ScType.EdgeAccessConstNegTemp.value]: { right: '~∌', left: '∉~' },
  [ScType.EdgeAccessConstFuzTemp.value]: { right: '~/∍', left: '∊/~' },
  [ScType.VarPermPosArc.value]: { right: '_∍', left: '_∊' },
  [ScType.EdgeAccessVarNegPerm.value]: { right: '_∌', left: '_∉' },
  [ScType.EdgeAccessVarFuzPerm.value]: { right: '_/∍', left: '_∊/' },
  [ScType.EdgeAccessVarPosTemp.value]: { right: '_~∍', left: '_∊~' },
  [ScType.EdgeAccessVarNegTemp.value]: { right: '_~∌', left: '_∉~' },
  [ScType.EdgeAccessVarFuzTemp.value]: { right: '_~/∍', left: '_∊/~' },
};
