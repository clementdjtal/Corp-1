"use client";

import { ButtonHTMLAttributes, useState } from "react";

type ActionPillProps = {
  icon: string;
  label: string;
  isCustomIcon?: boolean;
  noIconFilter?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

const cn = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

export function ActionPill({
  icon,
  label,
  isCustomIcon = true,
  noIconFilter = false,
  onClick,
}: ActionPillProps) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className={cn(
        "relative inline-flex items-center cursor-pointer h-10 rounded-full",
        "transition-[background-color,padding] duration-200 ease-out",
        hover
          ? "bg-neutrallight-200 dark:bg-buttondark-900 px-4"
          : "bg-transparent px-2.5",
      )}
    >
      <span className="flex items-center justify-center w-5 h-5 shrink-0">
        {isCustomIcon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/CorpIcon/${icon}.svg`}
            alt={label}
            className={cn("w-5 h-5", !noIconFilter && "custom-icon")}
          />
        )}
      </span>
      <span
        className="overflow-hidden transition-[max-width,margin-left] duration-200 ease-out"
        style={{
          maxWidth: hover ? 250 : 0,
          marginLeft: hover ? 8 : 0,
        }}
      >
        <span
          className={cn(
            "block whitespace-nowrap text-[13px] font-[500] tracking-[-0.15px]",
            "text-neutrallight-900 dark:text-neutraldark-900",
            "transition-all duration-200 ease-out",
          )}
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? "scale(1)" : "scale(0.85)",
            filter: hover ? "blur(0px)" : "blur(4px)",
          }}
        >
          {label}
        </span>
      </span>
    </button>
  );
}
