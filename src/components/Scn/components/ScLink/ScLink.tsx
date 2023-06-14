import { useCallback, useEffect, useState } from 'react';
import { useClient } from '@components/ClientProvider';
import { TLinkFormat } from '@components/Scn';
import { useInView } from '@hooks/useInView';
import { ScAddr } from 'ts-sc-client';

import { voidElements } from './constants';
import { StyledScnLink, StyledScTag, StyledScTagLink } from './styled';
import { useDifferedLinkContent } from './useDifferedLinkContent';

interface IProps {
  addr: number;
  contentType?: TLinkFormat | null;
  content?: string | null;
}

interface IHtmlNodeToReactProps {
  node: ChildNode;
}

// const nodeAttributesToObject = (node: HTMLElement) => {
//   if (!node.hasAttributes()) return {};
//   return Array.from(node.attributes).reduce((acc, curr) => {
//     if(curr.name === "style") {
//       console.log(node)
//       return acc;
//     }
//     return {
//       ...acc,
//       [curr.name]: curr.value,
//     };
//   }, {});
// };

const HtmlNodeToReact = ({ node }: IHtmlNodeToReactProps) => {
  if (node instanceof Text) return <>{node.textContent}</>;
  if (node.nodeName === 'SC_ELEMENT') {
    const systemId = (node as HTMLElement).attributes.getNamedItem('sys_idtf')?.nodeValue || undefined;
    return <StyledScnLink systemId={systemId} />;
  }
  if (!(node instanceof HTMLElement)) return null;

  const isVoidElem = voidElements.includes(node.nodeName.toLowerCase());
  const Tag = node.nodeName.toLowerCase() as keyof JSX.IntrinsicElements;

  if (isVoidElem) return <Tag />;

  return (
    <Tag>
      {Array.from(node.childNodes).map((childNode, ind) => (
        <HtmlNodeToReact key={ind} node={childNode} />
      ))}
    </Tag>
  );
};

const ScLinkHtml = ({ addr }: IProps) => {
  const [contentHtml, setContentHtml] = useState<ChildNode | null>(null);
  const [targetRef, isInView] = useInView();
  const client = useClient();

  const parseHtml = useCallback(async () => {
    const [{ data }] = await client.getLinkContents([new ScAddr(addr)]);

    if (!data) return;
    const parser = new DOMParser();
    const dom = parser.parseFromString(String(data).trim(), 'text/html');
    const contentHtmlObject = dom.querySelector('body') as HTMLElement;
    setContentHtml(contentHtmlObject || null);
  }, [addr, client]);

  useEffect(() => {
    if (isInView) {
      parseHtml();
    }
  }, [parseHtml, isInView]);

  return (
    <StyledScTag isHTML addr={addr}>
      {contentHtml &&
        Array.from(contentHtml.childNodes).map((childNode, ind) => <HtmlNodeToReact key={ind} node={childNode} />)}
      {!contentHtml && <span ref={targetRef} />}
    </StyledScTag>
  );
};

const ScLinkContent = ({ addr, contentType }: IProps) => {
  const { content, targetRef } = useDifferedLinkContent(addr);

  if (contentType === 'format_html') {
    return <ScLinkHtml addr={addr} />;
  }

  return (
    <StyledScTag as="span" addr={addr}>
      {content && contentType === 'format_png' && <img src={`data:image/png;base64,${content}`} />}
      {contentType !== 'format_png' && <>{content}</>}
      {!content && <span ref={targetRef} />}
    </StyledScTag>
  );
};

export const ScLink = ({ addr, contentType }: IProps) => {
  return (
    <StyledScTagLink appearance="transparent" addr={addr}>
      <ScLinkContent addr={addr} contentType={contentType} />
    </StyledScTagLink>
  );
};
