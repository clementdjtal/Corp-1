"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { IconButton } from "./IconButton";
import { DropdownContainer } from "./DropdownContainer";
import { CustomButton } from "./CustomButton";
import { HoverList } from "./HoverList";
import { CustomBadge } from "./CustomBadge";

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export function Header() {
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  const themes: Array<{
    key: "light" | "dark" | "system";
    label: string;
    icon: string;
  }> = [
    { key: "light", label: "Clair", icon: "light-theme" },
    { key: "dark", label: "Sombre", icon: "dark-theme" },
    { key: "system", label: "Système", icon: "system" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50  ">
      <nav className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between  py-1 pl-1 pr-2 rounded-full dark:bg-inputdark-900 bg-neutrallight-100 border-[0.5px] border-neutrallight-300 dark:border-borderdark-800 shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05)]
          dark:shadow-[0_8px_18px_-2px_rgba(0,0,0,1)] translate-y-[84px]"
        >
          <div className="flex items-center gap-1 ">
            <img src={`/CorpIcon/fav.png`} className=" w-7 h-7 mr-2" />
            <CustomBadge
              text="Working"
              colorScheme="neutral"
              variant="flat"
              rounded="full"
              size="lg"
            />
            <CustomBadge
              text="En recherche"
              colorScheme="success"
              variant="flat"
              rounded="full"
              size="lg"
            />
          </div>

          <div ref={wrapperRef} className="relative inline-flex">
            <div className="relative inline-flex">
              <IconButton
                icon=""
                buttonType="light"
                colorScheme="neutral"
                size="sm"
                onClick={() => setIsOpen((v) => !v)}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {themes.map((th) => {
                  const active = mounted && theme === th.key;
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={th.key}
                      src={`/CorpIcon/${th.icon}.svg`}
                      alt={th.label}
                      className="theme-morph-icon absolute w-4 h-4"
                      data-active={active}
                    />
                  );
                })}
              </div>
            </div>

            <DropdownContainer
              isVisible={isOpen}
              position="bottom-center"
              width="132px"
              offsetY={10}
            >
              <div className=" flex flex-col">
                <HoverList className="flex flex-col p-1">
                  {themes.map((th) => {
                    const active = mounted && theme === th.key;
                    return (
                      <div key={th.key} className="relative">
                        <CustomButton
                          text={th.label}
                          buttonType="light"
                          colorScheme="neutral"
                          justify="start"
                          textAlign="left"
                          disableHoverBg
                          leftIcon={th.icon}
                          isCustomLeftIcon
                          onClick={() => {
                            setTheme(th.key);
                            setIsOpen(false);
                          }}
                          heightButton="h-[32px]"
                          fontWeight="medium-bold"
                        />
                        {active && (
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutrallight-900 dark:text-neutraldark-900">
                            <CheckIcon />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </HoverList>
              </div>
            </DropdownContainer>
          </div>
        </div>
      </nav>
    </header>
  );
}
