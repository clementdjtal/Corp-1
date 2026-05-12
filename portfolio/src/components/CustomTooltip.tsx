"use client";

import { ReactNode, useState } from "react";

type Position =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right";

type CustomTooltipProps = {
  text?: string;
  position?: Position;
  disabled?: boolean;
  children: ReactNode;
};

const POSITION_CLASSES: Record<Position, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  "top-left": "bottom-full right-0 mb-2",
  "top-right": "bottom-full left-0 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  "bottom-left": "top-full right-0 mt-2",
  "bottom-right": "top-full left-0 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export function CustomTooltip({
  text,
  position = "top",
  disabled = false,
  children,
}: CustomTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (disabled || !text) return <>{children}</>;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-2 py-1 text-xs font-medium text-white bg-neutrallight-900 dark:bg-neutraldark-100 dark:text-neutraldark-900 rounded-md whitespace-nowrap pointer-events-none ${POSITION_CLASSES[position]}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
