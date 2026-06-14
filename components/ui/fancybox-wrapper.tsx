"use client";

import React, { useRef, useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface FancyboxProps {
  children?: React.ReactNode;
  delegate?: string;
  options?: any;
}

export function FancyboxWrapper({
  children,
  delegate = "[data-fancybox]",
  options = {},
}: FancyboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  }, [delegate, options]);

  return <div ref={containerRef} className="contents">{children}</div>;
}
