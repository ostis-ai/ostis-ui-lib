import { ScType } from 'ts-sc-client';

import { IScnChild, IScnNode } from '../model';

import { html, image1 } from './constants';

let ind = 0;
const getId = () => ind++;

const getLinks = (): IScnChild => ({
  arcs: [
    {
      addr: getId(),
      idtf: null,
      type: ScType.EdgeDCommonConst.value,
      direction: 'right',
    },
    {
      addr: getId(),
      idtf: null,
      type: ScType.EdgeDCommonConst.value,
      direction: 'right',
    },
  ],
  modifiers: [
    {
      addr: getId(),
      idtf: 'основной идентификатор*',
      type: 3,
      modifierArcs: [
        {
          addr: getId(),
          idtf: null,
          content: null,
          type: ScType.EdgeAccessConstPosPerm.value,
        },
        {
          addr: getId(),
          idtf: null,
          content: null,
          type: ScType.EdgeAccessConstPosPerm.value,
        },
      ],
    },
    {
      addr: getId(),
      idtf: 'еще один идентификатор*',
      type: 3,
      modifierArcs: [
        {
          addr: getId(),
          idtf: null,
          content: null,
          type: ScType.EdgeAccessVarPosPerm.value,
        },
        {
          addr: getId(),
          idtf: null,
          content: null,
          type: ScType.EdgeAccessVarPosPerm.value,
        },
      ],
    },
    {
      addr: getId(),
      idtf: "больше - не меньше'",
      type: 3,
      modifierArcs: [
        {
          addr: getId(),
          idtf: null,
          content: null,
          type: ScType.EdgeAccessConstPosPerm.value,
        },
        {
          addr: getId(),
          idtf: null,
          content: null,
          type: ScType.EdgeAccessConstPosPerm.value,
        },
      ],
    },
  ],
  linkedNodes: [
    {
      addr: getId(),
      content: 'База знаний Financial DK',
      contentType: null,
      sourceNode: null,
      targetNode: null,
      idtf: null,
      type: ScType.LinkConst.value,
      children: null,
    },
    {
      addr: getId(),
      content: 'Financial DK knowledge base',
      contentType: null,
      sourceNode: null,
      targetNode: null,
      idtf: null,
      type: ScType.LinkConst.value,
      children: null,
    },
  ],
});

const decompositionChild: IScnChild = {
  arcs: [
    {
      addr: getId(),
      idtf: null,
      type: ScType.EdgeAccessConstPosPerm.value,
      direction: 'left',
    },
  ],
  modifiers: [
    {
      addr: getId(),
      idtf: 'декомпозиция раздела*',
      type: 3,
      modifierArcs: [
        {
          addr: getId(),
          idtf: null,
          content: null,
          type: ScType.EdgeAccessConstPosPerm.value,
        },
      ],
    },
  ],
  linkedNodes: [
    {
      addr: getId(),
      content: null,
      idtf: null,
      type: ScType.NodeConstTuple.value,
      contentType: null,
      sourceNode: null,
      targetNode: null,
      children: [
        {
          arcs: [
            {
              addr: getId(),
              idtf: null,
              type: ScType.EdgeAccessConstPosPerm.value,
              direction: 'right',
            },
          ],
          modifiers: [
            {
              addr: getId(),
              idtf: "1'",
              type: 3,
              modifierArcs: [
                {
                  addr: getId(),
                  idtf: null,
                  content: null,
                  type: ScType.EdgeAccessConstPosPerm.value,
                },
              ],
            },
          ],
          linkedNodes: [
            {
              addr: getId(),
              content: null,
              idtf: 'Раздел. Предметная область бизнес процессов',
              type: ScType.NodeConst.value,
              children: [
                {
                  arcs: [
                    {
                      addr: getId(),
                      idtf: null,
                      type: ScType.EdgeAccessConstPosPerm.value,
                      direction: 'left',
                    },
                  ],
                  modifiers: null,
                  linkedNodes: [
                    {
                      addr: getId(),
                      content: 'Ссылка без модификатора',
                      contentType: null,
                      sourceNode: null,
                      targetNode: null,
                      idtf: null,
                      type: ScType.LinkConst.value,
                      children: null,
                    },
                  ],
                },
              ],
              contentType: null,
              sourceNode: null,
              targetNode: null,
            },
          ],
        },
        {
          arcs: [
            {
              addr: getId(),
              idtf: null,
              type: ScType.EdgeAccessConstPosPerm.value,
              direction: 'right',
            },
          ],
          modifiers: null,
          linkedNodes: [
            {
              addr: getId(),
              content: null,
              idtf: 'Раздел. Предметная область экономических субъектов',
              type: ScType.NodeConst.value,
              children: null,
              contentType: null,
              sourceNode: null,
              targetNode: null,
            },
          ],
        },
        {
          arcs: [
            {
              addr: getId(),
              idtf: null,
              type: ScType.EdgeAccessConstPosPerm.value,
              direction: 'right',
            },
          ],
          modifiers: null,
          linkedNodes: [
            {
              addr: getId(),
              content: null,
              idtf: 'Раздел. Предметная область персон',
              type: ScType.NodeConst.value,
              children: null,
              contentType: null,
              sourceNode: null,
              targetNode: null,
            },
          ],
        },
      ],
    },
  ],
};

export const tree1: IScnNode = {
  addr: getId(),
  idtf: 'База знаний Financial DK',
  type: ScType.NodeConst.value,
  content: null,
  contentType: null,
  sourceNode: null,
  targetNode: null,
  children: [
    getLinks(),
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          type: ScType.EdgeDCommonConst.value,
          direction: 'left',
        },
      ],
      modifiers: [
        {
          addr: getId(),
          idtf: 'идентификатор*',
          type: 3,
          modifierArcs: [
            {
              addr: getId(),
              idtf: null,
              content: null,
              type: ScType.EdgeAccessConstPosPerm.value,
            },
          ],
        },
      ],
      linkedNodes: [
        {
          addr: 10000,
          content: 'Ссылка',
          contentType: null,
          sourceNode: null,
          targetNode: null,
          idtf: null,
          type: ScType.LinkConst.value,
          children: null,
        },
      ],
    },
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          type: ScType.EdgeUCommonVar.value,
          direction: 'left',
        },
      ],
      modifiers: null,
      linkedNodes: [
        {
          addr: getId(),
          content: 'Ссылка без модификатора',
          contentType: null,
          sourceNode: null,
          targetNode: null,
          idtf: null,
          type: ScType.LinkConst.value,
          children: null,
        },
      ],
    },
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          type: ScType.EdgeAccessVarFuzTemp.value,
          direction: 'left',
        },
      ],
      modifiers: null,
      linkedNodes: [
        {
          addr: getId(),
          content: null,
          contentType: null,
          sourceNode: null,
          targetNode: null,
          idtf: 'Длинная дуга',
          type: ScType.NodeConst.value,
          children: null,
        },
      ],
    },
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          type: ScType.EdgeAccessConstPosPerm.value,
          direction: 'left',
        },
      ],
      modifiers: null,
      linkedNodes: [
        {
          addr: getId(),
          content: null,
          contentType: null,
          sourceNode: null,
          targetNode: null,
          idtf: 'стартовый sc-элемент',
          type: ScType.NodeConst.value,
          children: null,
        },
      ],
    },
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          type: ScType.EdgeAccessConstPosPerm.value,
          direction: 'left',
        },
      ],
      modifiers: null,
      linkedNodes: [
        {
          addr: 10001,
          content: null,
          contentType: null,
          sourceNode: {
            addr: getId(),
            idtf: 'Авторизованный пользователь*',
            type: ScType.NodeConst.value,
            content: null,
          },
          targetNode: {
            addr: getId(),
            idtf: 'sc-модель базы знаний',
            type: ScType.NodeConst.value,
            content: null,
          },
          idtf: null,
          type: ScType.EdgeDCommonConst.value,
          children: null,
        },
      ],
    },
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          type: ScType.EdgeAccessConstPosPerm.value,
          direction: 'left',
        },
      ],
      modifiers: null,
      linkedNodes: [
        {
          addr: getId(),
          content: null,
          contentType: null,
          sourceNode: null,
          targetNode: null,
          idtf: null,
          type: ScType.NodeConst.value,
          children: null,
        },
      ],
    },
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          type: ScType.EdgeAccessConstPosPerm.value,
          direction: 'left',
        },
      ],
      modifiers: null,
      linkedNodes: [
        {
          addr: 10001,
          content: null,
          contentType: null,
          sourceNode: null,
          targetNode: null,
          idtf: null,
          type: ScType.NodeStruct.value,
          children: null,
        },
      ],
    },
    decompositionChild,
  ],
};

export const tree2: IScnNode = {
  addr: getId(),
  idtf: 'База знаний Financial DK',
  type: ScType.LinkConst.value,
  content: 'Контент ссылки',
  contentType: null,
  sourceNode: null,
  targetNode: null,
  children: [
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          direction: 'right',
          type: ScType.EdgeAccessConstPosPerm.value,
        },
      ],
      modifiers: null,
      linkedNodes: [
        {
          addr: getId(),
          content: null,
          contentType: null,
          sourceNode: null,
          targetNode: null,
          idtf: 'стартовый sc-элемент',
          type: ScType.NodeConst.value,
          children: null,
        },
      ],
    },
  ],
};

export const tree3: IScnNode = {
  addr: getId(),
  idtf: 'База знаний Financial DK',
  content: null,
  sourceNode: {
    addr: getId(),
    idtf: 'Авторизованный пользователь*',
    type: ScType.NodeConst.value,
    content: null,
  },
  targetNode: {
    addr: getId(),
    idtf: 'sc-модель базы знаний',
    type: ScType.NodeConst.value,
    content: null,
  },
  type: ScType.EdgeDCommonConst.value,
  contentType: null,
  children: [
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          direction: 'right',
          type: ScType.EdgeAccessConstPosPerm.value,
        },
      ],
      modifiers: null,
      linkedNodes: [
        {
          addr: getId(),
          content: null,
          contentType: null,
          sourceNode: null,
          targetNode: null,
          idtf: 'стартовый sc-элемент',
          type: ScType.NodeConst.value,
          children: null,
        },
      ],
    },
  ],
};

export const tree4: IScnNode = {
  addr: getId(),
  idtf: 'База знаний Financial DK',
  content: null,
  sourceNode: {
    addr: getId(),
    idtf: 'Авторизованный пользователь*',
    type: ScType.NodeConst.value,
    content: null,
  },
  targetNode: {
    addr: getId(),
    idtf: 'sc-модель базы знаний',
    type: ScType.NodeConst.value,
    content: null,
  },
  type: ScType.EdgeDCommonConst.value,
  contentType: null,
  children: [
    {
      arcs: [
        {
          addr: getId(),
          idtf: null,
          direction: 'right',
          type: ScType.EdgeAccessConstPosPerm.value,
        },
      ],
      modifiers: null,
      linkedNodes: [
        {
          addr: getId(),
          content: image1,
          contentType: 'format_png',
          sourceNode: null,
          targetNode: null,
          idtf: null,
          type: ScType.LinkConst.value,
          children: null,
        },
        {
          addr: getId(),
          content: html,
          contentType: 'format_html',
          sourceNode: null,
          targetNode: null,
          idtf: null,
          type: ScType.LinkConst.value,
          children: null,
        },
      ],
    },
  ],
};
