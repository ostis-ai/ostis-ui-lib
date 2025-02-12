import { ScType } from 'ts-sc-client';

export const arcMap = {
  [ScType.CommonEdge.value]: { right: '↔', left: '↔' },
  [ScType.CommonArc.value]: { right: '→', left: '←' },
  [ScType.MembershipArc.value]: { right: '..∍', left: '∊..' },
  [ScType.ConstCommonEdge.value]: { right: '⇔', left: '⇔' },
  [ScType.VarCommonEdge.value]: { right: '⇐⇒', left: '⇐⇒' },
  [ScType.ConstCommonArc.value]: { right: '⇒', left: '⇐' },
  [ScType.VarCommonArc.value]: { right: '_⇒', left: '_⇐' },
  [ScType.ConstPermPosArc.value]: { right: '∍', left: '∊' },
  [ScType.ConstPermNegArc.value]: { right: '∌', left: '∉' },
  [ScType.ConstFuzArc.value]: { right: '/∍', left: '∊/' },
  [ScType.ConstTempPosArc.value]: { right: '~∍', left: '∊~' },
  [ScType.ConstTempNegArc.value]: { right: '~∌', left: '∉~' },
  [ScType.VarPermPosArc.value]: { right: '_∍', left: '_∊' },
  [ScType.VarPermNegArc.value]: { right: '_∌', left: '_∉' },
  [ScType.VarFuzArc.value]: { right: '_/∍', left: '_∊/' },
  [ScType.VarTempPosArc.value]: { right: '_~∍', left: '_∊~' },
  [ScType.VarTempNegArc.value]: { right: '_~∌', left: '_∉~' },
};
