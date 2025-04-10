import { FC, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@components/Language';
import { ContextMenu } from '@components/ScTag';
import { useScUtils } from '@components/ScUtils';
import { useBooleanState } from '@hooks/useBooleanState';
import { langToKeynode } from '@utils/langToKeynode';
import { snakeToCamelCase } from '@utils/snakeToCamelCase';

import { Frame, StyledSpinner, Wrap } from './styled';
import { EWindowEvents, ITarget, IWindowEventData } from './types';

const SPINNER_COLOR = '#5896C0';

const readonlyStyle = `
  <style>
    .demo-scg-tools-panel {
      display: none !important;
    }
  </style>
`;

export interface IScgProps {
  action?: number;
  className?: string;
  show?: boolean;
  readonly?: boolean;
  url: string;
  onOpenFragment?: (addr: number) => void;
  onUpdateScg?: (action: number) => void;
  onEmptyFragment?: () => void;
  onFullfilledFragment?: () => void;
}

export const Scg: FC<IScgProps> = ({
  action,
  readonly,
  className,
  url,
  show = false,
  onOpenFragment,
  onUpdateScg,
  onEmptyFragment,
  onFullfilledFragment,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [targetNode, setTargetNode] = useState<ITarget | null>(null);
  const [isConfirmDeletePopupShown, showConfirmDeletePopup, hideConfirmDeletePopup] = useBooleanState(false);
  const [isConfirmClearScenePopupShown, showConfirmClearScenePopup, hideConfirmClearScenePopup] =
    useBooleanState(false);
  const [confirmDeleteElementsFunc, setConfirmDeleteElementsFunc] = useState<any>();
  const [confirmClearSceneFunc, setConfirmClearSceneFunc] = useState<any>();

  const ref = useRef<HTMLIFrameElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const { searchKeynodes } = useScUtils();

  const lang = useLanguage();

  const onClose = () => setTargetNode(null);

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    const target = (e.target as HTMLElement).closest('[sc_addr]') as HTMLElement | null;
    if (!target) return;
    const addr = Number(target.attributes.getNamedItem('sc_addr')?.nodeValue) || undefined;
    setTargetNode(null);
    setTimeout(() => {
      setTargetNode({
        element: target,
        addr,
      });
    }, 10);
  };

  useEffect(() => {
    setIsLoading(true);
    const iframe = ref.current;
    if (!iframe) return setIsLoading(false);
    (iframe.contentWindow as any).onInitializationFinished = () => {
      setIsReady(true);
    };

    (iframe.contentWindow as any).demoImplementation = true;

    iframe.contentWindow?.addEventListener('DOMContentLoaded', () => {
      iframe.contentDocument?.addEventListener('click', onClose);
      iframe.contentDocument?.addEventListener('contextmenu', onContextMenu);
      if (readonly) iframe.contentDocument?.head.insertAdjacentHTML('beforeend', readonlyStyle);
      setTimeout(() => setIsLoading(false), 800);
    });
  }, [readonly]);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    window.onmessage = function (event: MessageEvent<IWindowEventData>) {
      switch (event.data.type) {
        case EWindowEvents.deleteScgElement:
          showConfirmDeletePopup();
          setConfirmDeleteElementsFunc(() => (iframe.contentWindow as any)?.deleteScgElement);
          break;
        case EWindowEvents.deleteScgElements:
          showConfirmDeletePopup();
          setConfirmDeleteElementsFunc(() => (iframe.contentWindow as any)?.deleteScgElements);
          break;
        case EWindowEvents.clearScene:
          showConfirmClearScenePopup();
          setConfirmClearSceneFunc(() => (iframe.contentWindow as any)?.clearScene);
          break;
        case EWindowEvents.updateScg:
          if (!action) break;
          onUpdateScg?.(action);
          break;
        case EWindowEvents.openFragment:
          if (!event.data?.payload?.fragmentAddr) break;
          onOpenFragment?.(event.data.payload.fragmentAddr);
          break;
        case EWindowEvents.emptyFragment:
          onEmptyFragment?.();
          break;
        case EWindowEvents.fullfilledFragment:
          onFullfilledFragment?.();
          break;
      }
    };
  }, [onUpdateScg, onOpenFragment, onEmptyFragment, onFullfilledFragment, action]);

  useEffect(() => {
    (async () => {
      if (!isReady || !show || !action) return;

      const iframe = ref.current;
      if (!iframe) return;

      const { ...rest } = await searchKeynodes(langToKeynode[lang]);
      const activeLangKeynode = rest[snakeToCamelCase(langToKeynode[lang])];
      (iframe.contentWindow as any).renderScg?.(action, activeLangKeynode.value);
    })();
  }, [isReady, action, show, lang, searchKeynodes]);

  targetRef.current = targetNode?.element || null;

  return (
    <Wrap $show={show} className={className}>
      {isLoading && <StyledSpinner appearance={SPINNER_COLOR} />}
      <Frame src={url} ref={ref} title="SCg codes" />
      {targetNode && <ContextMenu onClose={onClose} addr={targetNode.addr} relativeRef={ref} targetRef={targetRef} />}
    </Wrap>
  );
};
