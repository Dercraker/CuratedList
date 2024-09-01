"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

export type CounterProps = {
  from?: number;
  to: number;
  digits?: number;
  duration?: number;
};

export const Counter = ({
  from = 0,
  to,
  duration = 2,
  digits = 2,
}: CounterProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration,
      ease: "easeInOut",

      onUpdate(value) {
        node.textContent = value.toFixed(digits);
      },
    });

    return () => controls.stop();
  }, [from, to, duration, digits]);

  return <span ref={nodeRef}>{from}</span>;
};
