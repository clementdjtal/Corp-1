"use client";

import { ButtonHTMLAttributes, useState } from "react";

type ActionPillProps = {
  icon: string;
  label: string;
  labelWidth: number;
  isCustomIcon?: boolean;
  noIconFilter?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

const cn = (...classes: (string | false | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

export function ActionPill({
  icon,
  label,
  labelWidth,
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
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      className={cn(
        "relative inline-flex items-center cursor-pointer py-1 px-1 rounded-full",
        hover ? "bg-neutrallight-200 dark:bg-buttondark-900" : "bg-transparent",
        "transition-colors duration-200",
      )}
    >
      <span className="flex items-center justify-center w-5 h-5 shrink-0">
        {isCustomIcon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/CorpIcon/${icon}.svg`}
            alt={label}
            className={cn("w-4 h-4", !noIconFilter && "custom-icon")}
          />
        )}
      </span>
      <span
        className="overflow-hidden flex items-center justify-center"
        style={{
          width: hover ? labelWidth : 0,
          transition: "width 350ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <span
          className={cn(
            "block whitespace-nowrap text-[13px] font-[500] tracking-[-0.15px]",
            "text-neutrallight-900 dark:text-neutraldark-900",
          )}
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? "scale(1)" : "scale(0.6)",
            filter: hover ? "blur(0px)" : "blur(4px)",
            transition: hover
              ? "opacity 350ms cubic-bezier(0.4, 0, 0.2, 1) 20ms, transform 350ms cubic-bezier(0.4, 0, 0.2, 1) 20ms, filter 350ms cubic-bezier(0.4, 0, 0.2, 1) 20ms"
              : "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 350ms cubic-bezier(0.4, 0, 0.2, 1), filter 350ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {label}
        </span>
      </span>
    </button>
  );
}
