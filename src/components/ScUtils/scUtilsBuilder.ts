import { TLanguage } from '@components/Language';
import { findKeynodesBuilder } from '@utils/findKeynodes';
import { langToKeynode } from '@utils/langToKeynode';
import { snakeToCamelCase } from '@utils/snakeToCamelCase';
import {
  ScAddr,
  ScClient,
  ScConstruction,
  ScEventParams,
  ScEventType,
  ScLinkContent,
  ScLinkContentType,
  ScTemplate,
  ScType,
} from 'ts-sc-client';

interface IProps {
  client: ScClient;
}

export const scUtilsBuilder = ({ client }: IProps) => {
  const findKeynodes = findKeynodesBuilder(client);

  const getMainIdLinkAddr = async (addr: ScAddr, lang: TLanguage) => {
    const { nrelMainIdtf, ...rest } = await findKeynodes('nrel_main_idtf', langToKeynode[lang]);
    const foundLang = rest[snakeToCamelCase(langToKeynode[lang])];

    const template = new ScTemplate();
    const linkAlias = '_link';

    template.tripleWithRelation(
      addr,
      ScType.EdgeDCommonVar,
      [ScType.LinkVar, linkAlias],
      ScType.EdgeAccessVarPosPerm,
      nrelMainIdtf,
    );
    template.triple(foundLang, ScType.EdgeAccessVarPosPerm, linkAlias);
    const result = await client.templateSearch(template);

    if (result.length) {
      return result[0].get(linkAlias);
    }
    return null;
  };

  const getMainId = async (addr: ScAddr, lang: TLanguage) => {
    const linkAddr = await getMainIdLinkAddr(addr, lang);

    if (linkAddr) {
      const contents = await client.getLinkContents([linkAddr]);
      return contents[0].data;
    }
    return null;
  };

  const getSystemId = async (addr: ScAddr) => {
    const { nrelSystemIdentifier } = await findKeynodes('nrel_system_identifier');

    const template = new ScTemplate();
    const linkAlias = '_link';

    template.tripleWithRelation(
      addr,
      ScType.EdgeDCommonVar,
      [ScType.LinkVar, linkAlias],
      ScType.EdgeAccessVarPosPerm,
      nrelSystemIdentifier,
    );
    const result = await client.templateSearch(template);

    if (result.length) {
      const contents = await client.getLinkContents([result[0].get(linkAlias)]);
      return String(contents[0].data);
    }
    return null;
  };

  const getId = async (addr: ScAddr, lang: TLanguage) => {
    const mainId = await getMainId(addr, lang);
    if (mainId) return String(mainId);
    const systemId = await getSystemId(addr);
    if (systemId) return String(systemId);
    return String(addr.value);
  };

  const addrOrSystemIdAddr = async (addrOrSystemId: string | number) => {
    const numericAddr = Number(addrOrSystemId);
    if (numericAddr) return numericAddr;
    const keynodes = await findKeynodes(String(addrOrSystemId));
    return keynodes[snakeToCamelCase(String(addrOrSystemId))].value;
  };

  const getAnswer = (actionNode: ScAddr) => {
    return new Promise<ScAddr>((resolve) => {
      findKeynodes('nrel_answer').then(async ({ nrelAnswer }) => {
        const onActionFinished = async (_subscibedAddr: ScAddr, arc: ScAddr, anotherAddr: ScAddr, eventId: number) => {
          const template = new ScTemplate();
          template.triple(nrelAnswer, ScType.EdgeAccessVarPosPerm, arc);
          const isNrelAnswer = (await client.templateSearch(template)).length;
          if (!isNrelAnswer) return;
          client.eventsDestroy(eventId);
          resolve(anotherAddr);
        };

        const eventParams = new ScEventParams(actionNode, ScEventType.AddOutgoingEdge, onActionFinished);

        const [eventId] = await client.eventsCreate(eventParams);

        const answerAlias = '_answer';

        const template = new ScTemplate();
        template.tripleWithRelation(
          actionNode,
          ScType.EdgeDCommonVar,
          [ScType.NodeVar, answerAlias],
          ScType.EdgeAccessVarPosPerm,
          nrelAnswer,
        );
        const searchRes = await client.templateSearch(template);

        const answer = searchRes[0]?.get(answerAlias);

        if (!answer) return;

        client.eventsDestroy(eventId.id);
        resolve(answer);
      });
    });
  };

  const createLink = async (item: string) => {
    const constructionLink = new ScConstruction();
    constructionLink.createLink(ScType.LinkConst, new ScLinkContent(item, ScLinkContentType.String));

    const resultLinkNode = await client.createElements(constructionLink);
    if (resultLinkNode.length) return resultLinkNode[0];
    return null;
  };

  return { findKeynodes, getId, getMainIdLinkAddr, getMainId, getSystemId, addrOrSystemIdAddr, getAnswer, createLink };
};
