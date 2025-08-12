import React, { ReactNode, useLayoutEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardOffsetsRef = useRef<number[]>([]);
  const endOffsetRef = useRef<number>(0);
  const containerTopRef = useRef<number>(0);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const container = containerRef.current;
    if (!container || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const pageScroll = window.scrollY;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const localScroll = pageScroll - containerTop;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endOffsetRef.current;

    const isSafari = typeof navigator !== 'undefined' && /Safari\//.test(navigator.userAgent) && !/Chrome\//.test(navigator.userAgent);
    const snapPx = (v: number) => Math.round(v * 1000) / 1000;
    const snapScale = (v: number) => (isSafari ? Math.round(v * 100) / 100 : Math.round(v * 1000) / 1000);
    const EPS = isSafari ? 0.01 : 0.003;

    let topCardIndex = 0;
    for (let j = 0; j < cardsRef.current.length; j++) {
      const jCardTop = cardOffsetsRef.current[j];
      const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
      if (localScroll >= jTriggerStart) topCardIndex = j;
    }

    cardsRef.current.forEach((card, i) => {
      const cardTop = cardOffsetsRef.current[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(localScroll, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        const depthInStack = topCardIndex - i;
        blur = Math.max(0, depthInStack * blurAmount);
      }

      const translateY = 0;

      const target = { translateY: snapPx(translateY), scale: snapScale(scale), rotation, blur };
      const last = lastTransformsRef.current.get(i);
      const SMOOTHING = 0.18;
      const current = last
        ? {
            translateY: snapPx(last.translateY + (target.translateY - last.translateY) * SMOOTHING),
            scale: snapScale(last.scale + (target.scale - last.scale) * SMOOTHING),
            rotation: last.rotation + (target.rotation - last.rotation) * SMOOTHING,
            blur: last.blur + (target.blur - last.blur) * SMOOTHING,
          }
        : target;

      const transform = `translate3d(0, 0, 0) scale(${current.scale})${rotationAmount ? ` rotate(${current.rotation}deg)` : ''}`;
      const lastApplied = lastTransformsRef.current.get(i);
      const needsUpdate =
        !lastApplied ||
        Math.abs(lastApplied.translateY - current.translateY) > EPS ||
        Math.abs(lastApplied.scale - current.scale) > EPS ||
        Math.abs(lastApplied.rotation - current.rotation) > EPS;
      if (needsUpdate) card.style.transform = transform;
      if (!lastApplied || lastApplied.blur !== current.blur) {
        const filter = current.blur > 0 ? `blur(${current.blur}px)` : '';
        card.style.filter = filter;
      }
      lastTransformsRef.current.set(i, current);

      if (i === cardsRef.current.length - 1) {
        const isInView = localScroll >= pinStart && localScroll <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    // Precompute offsets for stability
    cardOffsetsRef.current = cards.map((c) => c.offsetTop);
    containerTopRef.current = container.getBoundingClientRect().top + window.scrollY;
    const endEl = container.querySelector('.scroll-stack-end') as HTMLElement;
    endOffsetRef.current = endEl ? endEl.offsetTop : container.scrollHeight;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      (card.style as any).webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      (card.style as any).webkitPerspective = '1000px';
      (card.style as any).zIndex = String(i + 1);
      (card.style as any).position = 'sticky';
      (card.style as any).top = `${parsePercentage(stackPosition, window.innerHeight) + itemStackDistance * i}px`;
    });

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        animationFrameRef.current = requestAnimationFrame(() => {
          ticking = false;
          updateCardTransforms();
        });
      }
    };
    const onResize = () => {
      cardOffsetsRef.current = cards.map((c) => c.offsetTop);
      containerTopRef.current = container.getBoundingClientRect().top + window.scrollY;
      const endEl2 = container.querySelector('.scroll-stack-end') as HTMLElement;
      endOffsetRef.current = endEl2 ? endEl2.offsetTop : 0;
      const topBase = parsePercentage(stackPosition, window.innerHeight);
      cards.forEach((card, i) => {
        (card.style as any).top = `${topBase + itemStackDistance * i}px`;
      });
      updateCardTransforms();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('touchmove', onScroll);
      window.removeEventListener('resize', onResize);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    onStackComplete,
    updateCardTransforms,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={containerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;

 