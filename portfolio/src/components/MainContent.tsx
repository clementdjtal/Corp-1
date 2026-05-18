"use client";

import { ReactNode } from "react";
import { useView } from "./ViewContext";

const easing = "cubic-bezier(0.4, 0, 0.2, 1)";

type MainContentProps = {
  children: ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  const { view } = useView();
  const isCV = view === "cv";

  return (
    <main
      className="fixed inset-0 overflow-y-auto"
      style={{
        opacity: isCV ? 0 : 1,
        transform: isCV ? "scale(0.92)" : "scale(1)",
        transformOrigin: "50% 50%",
        filter: isCV ? "blur(8px)" : "blur(0px)",
        transition: isCV
          ? `opacity 300ms ${easing}, transform 380ms ${easing}, filter 280ms ${easing}`
          : `opacity 320ms ${easing} 200ms, transform 380ms ${easing} 200ms, filter 320ms ${easing} 200ms`,
        pointerEvents: isCV ? "none" : "auto",
      }}
    >
      {children}
    </main>
  );
}
