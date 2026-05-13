"use client";

import { ActionPill } from "./ActionPill";

export function MultitaskBar() {
  return (
    <div className="fixed bottom-[128px] left-1/2 -translate-x-1/2 z-40">
      <div
        className="
          flex items-center gap-1 p-1 rounded-full
          bg-neutrallight-100/90 dark:bg-containerdark-900/90
          border-[0.5px] border-neutrallight-300 dark:border-borderdark-900
          backdrop-blur-md
          shadow-[0_8px_24px_-6px_rgba(0,0,0,0.15)]
          dark:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6)]
        "
      >
        <ActionPill icon="cv" label="Lire CV" labelWidth={50} />
        <ActionPill icon="contact" label="Contact" labelWidth={54} />
      </div>
    </div>
  );
}
