"use client";

import { useView } from "./ViewContext";

const easing = "cubic-bezier(0.4, 0, 0.2, 1)";

export function CVView() {
  const { view } = useView();
  const isOpen = view === "cv";

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      style={{
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "scale(1)" : "scale(1.05)",
        filter: isOpen ? "blur(0px)" : "blur(8px)",
        transition: isOpen
          ? `opacity 350ms ${easing} 250ms, transform 350ms ${easing} 250ms, filter 350ms ${easing} 250ms`
          : `opacity 200ms ${easing}, transform 280ms ${easing}, filter 220ms ${easing}`,
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div className="text-center">
        <h1 className="text-[32px] font-semibold tracking-[-0.5px] text-neutrallight-900 dark:text-neutraldark-900">
          CV
        </h1>
        <p className="mt-2 text-[14px] text-neutrallight-600 dark:text-neutraldark-600">
          Contenu du CV à venir
        </p>
      </div>
    </div>
  );
}
