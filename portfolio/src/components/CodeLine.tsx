"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { DropdownContainer } from "./DropdownContainer";
import { CustomButton } from "./CustomButton";
import { HoverList } from "./HoverList";

export type LineStatus = "default" | "modified" | "deleted";

type CodeLineProps = {
  lineNumber: number;
  text: string;
  initialStatus?: LineStatus;
  onMeasure?: (visualLines: number) => void;
};

const LINE_HEIGHT = 28;

const STATUS_COLORS: Record<LineStatus, string> = {
  default: "bg-neutrallight-300 dark:bg-borderdark-900",
  modified: "bg-primarylight-900 dark:bg-primarydark-900",
  deleted: "bg-destructive-900",
};

const TEXT_COLORS: Record<LineStatus, string> = {
  default: "text-neutrallight-700 dark:text-neutraldark-600",
  modified: "text-neutrallight-900 dark:text-neutraldark-900",
  deleted: "text-destructive-900 line-through opacity-60",
};

const CopyIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const MentionIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
);

const RestoreIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <polyline points="3 4 3 10 9 10" />
  </svg>
);

export function CodeLine({
  lineNumber,
  text,
  initialStatus = "default",
  onMeasure,
}: CodeLineProps) {
  const [status, setStatus] = useState<LineStatus>(initialStatus);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [visualLines, setVisualLines] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Measure how many visual lines the wrapped text takes
  useLayoutEffect(() => {
    if (!textRef.current) return;

    const measure = () => {
      const el = textRef.current;
      if (!el) return;
      const count = Math.max(1, Math.round(el.scrollHeight / LINE_HEIGHT));
      setVisualLines(count);
      onMeasure?.(count);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(textRef.current);
    return () => ro.disconnect();
  }, [text, onMeasure]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const showButton = hover || open;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setStatus("deleted");
    setOpen(false);
  };

  const handleRestore = () => {
    setStatus("modified");
    setOpen(false);
  };

  const handleMention = () => {
    setOpen(false);
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group flex items-stretch gap-3 -mx-3 px-3 rounded-md transition-colors duration-150 hover:bg-neutrallight-200/50 dark:hover:bg-buttondark-900/30"
    >
      {/* Gutter: one row per visual line (status bar + line number) */}
      <div className="flex shrink-0 select-none">
        {/* Status bar — single continuous bar across all visual lines */}
        <span
          className={`w-0.5 transition-colors duration-200 ${STATUS_COLORS[status]}`}
        />
        {/* Line numbers — one per visual line */}
        <div className="flex flex-col ml-2">
          {Array.from({ length: visualLines }).map((_, i) => (
            <span
              key={i}
              className="text-[11px] tabular-nums font-jetbrains text-neutrallight-500 dark:text-neutraldark-500 w-6 text-right flex items-center justify-end"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                height: LINE_HEIGHT,
              }}
            >
              {lineNumber + i}
            </span>
          ))}
        </div>
      </div>

      {/* Line text — wraps naturally */}
      <p
        ref={textRef}
        className={`flex-1 min-w-0 text-[14px] tracking-[-0.2px] font-medium transition-colors duration-200 ${TEXT_COLORS[status]}`}
        style={{ lineHeight: `${LINE_HEIGHT}px` }}
      >
        {text}
      </p>

      {/* Action button — visible on hover or when dropdown open */}
      <div
        ref={wrapperRef}
        className="relative shrink-0 self-center"
        style={{
          opacity: showButton ? 1 : 0,
          transition: "opacity 150ms ease-out",
          pointerEvents: showButton ? "auto" : "none",
        }}
      >
        <IconButton
          icon="more"
          isCustomIcon
          buttonType="light"
          colorScheme="neutral"
          size="sm"
          onClick={() => setOpen((v) => !v)}
        />

        <DropdownContainer
          isVisible={open}
          position="bottom-right"
          width="180px"
          offsetY={6}
        >
          <HoverList className="flex flex-col p-1">
            <CustomButton
              text="Copier"
              buttonType="light"
              colorScheme="neutral"
              justify="start"
              textAlign="left"
              disableHoverBg
              leftIconNode={<CopyIcon />}
              onClick={handleCopy}
              heightButton="h-[32px]"
              fontWeight="medium"
            />
            <CustomButton
              text="Mentionner"
              buttonType="light"
              colorScheme="neutral"
              justify="start"
              textAlign="left"
              disableHoverBg
              leftIconNode={<MentionIcon />}
              onClick={handleMention}
              heightButton="h-[32px]"
              fontWeight="medium"
            />
            {status === "deleted" ? (
              <CustomButton
                text="Restaurer"
                buttonType="light"
                colorScheme="neutral"
                justify="start"
                textAlign="left"
                disableHoverBg
                leftIconNode={<RestoreIcon />}
                onClick={handleRestore}
                heightButton="h-[32px]"
                fontWeight="medium"
              />
            ) : (
              <CustomButton
                text="Supprimer"
                buttonType="light"
                colorScheme="destructive"
                justify="start"
                textAlign="left"
                disableHoverBg
                leftIconNode={<TrashIcon />}
                onClick={handleDelete}
                heightButton="h-[32px]"
                fontWeight="medium"
              />
            )}
          </HoverList>
        </DropdownContainer>
      </div>
    </div>
  );
}
