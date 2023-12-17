import { useCallback, useEffect, useState } from 'react';
import { useClient } from '@components/ClientProvider';
import { useInView } from '@hooks/useInView';
import { ScAddr } from 'ts-sc-client';

export const useDifferedLinkContent = (addr: number) => {
  const [content, setContent] = useState<string | null>(null);
  const [targetRef, isInView] = useInView();
  const client = useClient();

  const getBase64 = useCallback(async () => {
    const [{ data }] = await client.getLinkContents([new ScAddr(addr)]);
    if (!data) return;
    setContent(String(data).trim());
  }, [addr, client]);

  useEffect(() => {
    if (isInView) {
      getBase64();
    }
  }, [getBase64, isInView]);

  return { content, targetRef };
};
