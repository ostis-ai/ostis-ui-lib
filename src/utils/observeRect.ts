// https://github.com/reach/observe-rect

export type RectProps = {
  rect: DOMRect | undefined;
  hasRectChanged: boolean;
  callbacks: ((rect: DOMRect | undefined) => void)[];
};

const props: (keyof DOMRect)[] = ['bottom', 'height', 'left', 'right', 'top', 'width'];

const rectChanged = (a: DOMRect = {} as DOMRect, b: DOMRect = {} as DOMRect) =>
  props.some((prop) => a[prop] !== b[prop]);

const observedNodes = new Map<Element, RectProps>();

let rafId: number;

const run = () => {
  const changedStates: RectProps[] = [];
  observedNodes.forEach((state, node) => {
    const { bottom, height, left, right, top, width, x, y } = node.getBoundingClientRect();

    const newRect = { bottom, height, left, right, top, width, x: x || left, y: y || top } as DOMRect;

    if (rectChanged(newRect, state.rect)) {
      state.rect = newRect;
      changedStates.push(state);
    }
  });

  changedStates.forEach((state) => {
    state.callbacks.forEach((cb) => cb(state.rect));
  });

  rafId = window.requestAnimationFrame(run);
};

export const observeRect = (node: Element, cb: (rect: DOMRect | undefined) => void) => {
  return {
    observe() {
      const wasEmpty = observedNodes.size === 0;
      if (observedNodes.has(node)) {
        observedNodes.get(node)?.callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: undefined,
          hasRectChanged: false,
          callbacks: [cb],
        });
      }
      if (wasEmpty) run();
    },

    unobserve() {
      const state = observedNodes.get(node);
      if (state) {
        const index = state.callbacks.indexOf(cb);
        if (index >= 0) state.callbacks.splice(index, 1);
        if (!state.callbacks.length) observedNodes.delete(node);
        if (!observedNodes.size) cancelAnimationFrame(rafId);
      }
    },
  };
};
