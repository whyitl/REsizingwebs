import React, { useEffect, useMemo, useState } from 'react';

type SimpleScrollStackProps = {
  children: React.ReactNode;
  /** Vertical scroll distance between each item (in pixels) */
  itemDistance?: number;
  /** How much items overlap when stacked (in pixels) */
  stackDistance?: number;
  /** CSS value for sticky top position (e.g. '20%', '15vh', '160px') */
  stackPosition?: string;
  /** Scale for the bottom-most item; top-most item scales to 1 */
  baseScale?: number;
  /** Extra spacer after the last item to let it reach the stacked position */
  tailSpacer?: number;
  className?: string;
};

type SimpleScrollStackItemProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Sticky scroll-stacking layout: each child becomes sticky at `stackPosition`,
 * overlaps the previous by `stackDistance`, and scales from `baseScale` → 1.
 * This achieves a smooth, accessible, CSS-first stacking effect without heavy JS.
 */
const SimpleScrollStack: React.FC<SimpleScrollStackProps> = ({
  children,
  className,
  itemDistance = 200,
  stackDistance = 30,
  stackPosition = '20%',
  baseScale = 0.85,
  tailSpacer,
}) => {
  const items = React.Children.toArray(children);
  const totalItems = items.length;

  const [viewportHeight, setViewportHeight] = useState<number>(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setViewportHeight(window.innerHeight);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const parseStackPositionToPx = useMemo(() => {
    return (value: string): number => {
      const v = value.trim();
      if (v.endsWith('px')) return Math.max(0, parseFloat(v));
      if (v.endsWith('vh')) return Math.max(0, (parseFloat(v) / 100) * viewportHeight);
      if (v.endsWith('%')) return Math.max(0, (parseFloat(v) / 100) * viewportHeight);
      const asNumber = Number(v);
      return Number.isFinite(asNumber) ? Math.max(0, asNumber) : 0;
    };
  }, [viewportHeight]);

  const computeScaleForIndex = (index: number): number => {
    if (totalItems <= 1) return 1;
    const scaleRange = 1 - baseScale;
    return baseScale + (scaleRange * index) / (totalItems - 1);
  };

  return (
    <div className={className ?? ''}>
      {items.map((child, index) => {
        const zIndex = index + 1; // newer items appear above older ones
        const marginTop = index === 0 ? 0 : -stackDistance;
        const scale = computeScaleForIndex(index);
        return (
          <div
            key={index}
            className="sticky will-change-transform"
            style={{
              top: stackPosition,
              zIndex,
              marginTop,
              marginBottom: index === totalItems - 1 ? 0 : itemDistance,
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
          >
            {child}
          </div>
        );
      })}
      {/* Spacer ensures the last item reaches the same stacked top; kept tight */}
      <div
        style={{
          height:
            tailSpacer ??
            Math.max(
              0,
              Math.round(
                parseStackPositionToPx(stackPosition) + Math.max(0, itemDistance - stackDistance) * Math.max(0, totalItems - 1)
              )
            ),
        }}
      />
    </div>
  );
};

export const SimpleScrollStackItem: React.FC<SimpleScrollStackItemProps> = ({
  children,
  className,
}) => {
  return <div className={className ?? ''}>{children}</div>;
};

export default SimpleScrollStack;


