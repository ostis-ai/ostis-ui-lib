import {
  PropsWithChildren, useEffect, useRef, useState,
} from "react";

type ExpandProperty = "width" | "height";
type PropertyAccordance = Record<
ExpandProperty,
"scrollWidth" | "scrollHeight"
>;

const propertyAccordance: PropertyAccordance = {
  width: "scrollWidth",
  height: "scrollHeight",
};

interface IProps {
  expanded: boolean;
  unmountOnEnd?: boolean;
  initialSize?: number;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  className?: string;
  growProperty?: ExpandProperty;
}

export const Expandable = ({
  expanded,
  children,
  className,
  initialSize = 0,
  unmountOnEnd = initialSize === 0,
  growProperty = "height",
  transitionDuration = "0.3s",
  transitionTimingFunction = "ease",
}: PropsWithChildren<IProps>) => {
  const [visible, setVisible] = useState(!unmountOnEnd);
  const [overflow, setOverflow] = useState<"hidden" | "visible">("hidden");
  const [targetSize, setTargetSize] = useState<number | "auto">(initialSize);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (expanded) {
      setVisible(true);
    } else if (node) {
      const currentSize = node[propertyAccordance[growProperty]];

      setTargetSize(currentSize);
      setOverflow("hidden");
      window.requestAnimationFrame(() => setTargetSize(initialSize));
    }
  }, [expanded, growProperty, initialSize]);

  useEffect(() => {
    const node = ref.current;
    if (expanded && visible && node) {
      const hiddenSize = node[propertyAccordance[growProperty]];
      setTargetSize(hiddenSize);
    }
  }, [expanded, visible, growProperty]);

  const onTransitionEnd = () => {
    if (expanded) {
      setTargetSize("auto");
      setOverflow("visible");
    } else if (unmountOnEnd) {
      setVisible(false);
    }
  };

  return visible ? (
    <div
      style={{
        overflow,
        transitionProperty: growProperty,
        [growProperty]: targetSize,
        transitionTimingFunction,
        transitionDuration,
      }}
      className={className}
      onTransitionEnd={onTransitionEnd}
      ref={ref}
    >
      {children}
    </div>
  ) : null;
};
