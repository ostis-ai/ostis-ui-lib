import { useCallback, useEffect, useRef, useState } from 'react';

export const useInView = <TargetRef extends HTMLElement, RootRef extends HTMLElement>({
  threshold,
  rootMargin,
  root,
}: IntersectionObserverInit = {}) => {
  const [isInView, setIsInView] = useState(false);

  const targetRef = useRef<TargetRef>(null);
  const rootRef = useRef<RootRef>(null);

  const onInView: IntersectionObserverCallback = useCallback((entries) => {
    setIsInView(entries.some(({ isIntersecting }) => isIntersecting));
  }, []);

  useEffect(() => {
    const targetElement = targetRef.current;

    if (!targetElement) return;

    const observer = new IntersectionObserver(onInView, {
      threshold,
      rootMargin,
      root: rootRef.current || root,
    });
    observer.observe(targetElement);
    return () => {
      observer.unobserve(targetElement);
    };
  }, [onInView, root, rootMargin, threshold]);

  return [targetRef, isInView, rootRef] as const;
};
