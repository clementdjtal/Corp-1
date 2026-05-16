"use client";

import { useState } from "react";
import { CodeLine } from "./CodeLine";

export type CodeSection = {
  title: string;
  lines: string[];
};

type CodeSectionsProps = {
  sections: CodeSection[];
};

export function CodeSections({ sections }: CodeSectionsProps) {
  // Flatten all lines across all sections to track them by global index
  const allLines: { sectionIndex: number; localIndex: number; text: string }[] =
    [];
  sections.forEach((section, si) => {
    section.lines.forEach((text, li) => {
      allLines.push({ sectionIndex: si, localIndex: li, text });
    });
  });

  const [visualCounts, setVisualCounts] = useState<number[]>(() =>
    allLines.map(() => 1),
  );

  // Compute global line numbers — continuous across sections, accounting for wraps
  const startNumbers: number[] = [];
  let acc = 1;
  for (let i = 0; i < allLines.length; i++) {
    startNumbers.push(acc);
    acc += visualCounts[i] ?? 1;
  }

  return (
    <>
      {sections.map((section, si) => (
        <section key={section.title} className="flex flex-col gap-2">
          <h2 className="text-[20px] font-medium tracking-[-0.3px] text-neutrallight-900 dark:text-neutraldark-900 mb-2">
            {section.title}
          </h2>
          <div className="flex flex-col">
            {section.lines.map((line, li) => {
              const globalIndex = allLines.findIndex(
                (l) => l.sectionIndex === si && l.localIndex === li,
              );
              return (
                <CodeLine
                  key={li}
                  lineNumber={startNumbers[globalIndex]}
                  text={line}
                  onMeasure={(count) => {
                    setVisualCounts((prev) => {
                      if (prev[globalIndex] === count) return prev;
                      const next = [...prev];
                      next[globalIndex] = count;
                      return next;
                    });
                  }}
                />
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
