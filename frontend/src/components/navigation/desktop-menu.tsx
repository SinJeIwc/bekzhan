"use client";

import { navigation } from "@constants/navigation";
import { LayoutGroup, motion } from "motion/react";
import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";

export const DesktopMenu = memo(function DesktopMenu() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = (index: number) => {
    setClickedIndex(index);
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => setClickedIndex(null), 300);
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <LayoutGroup id="desktop-menu">
      <nav
        aria-label="Primary"
        className="relative hidden items-center rounded-full border border-chart-2/80 p-2 md:flex"
        onMouseLeave={() => setHoveredIndex(null)}
        onBlur={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            setHoveredIndex(null);
          }
        }}
      >
        {navigation.map((item, index) => (
          <Link
            key={item.url}
            href={item.url}
            className="relative z-10 cursor-pointer px-3 py-1.5 text-base transition-colors focus-visible:outline-none"
            onMouseEnter={() => setHoveredIndex(index)}
            onFocus={() => setHoveredIndex(index)}
            onClick={() => handleClick(index)}
          >
            {clickedIndex === index && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-primary/20"
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}

            {hoveredIndex === index && (
              <motion.span
                aria-hidden="true"
                layoutId="hover"
                className="absolute inset-0 rounded-full bg-chart-2/20"
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                  opacity: { duration: 0.15 },
                }}
              />
            )}

            <span className="relative z-10">{item.title}</span>
          </Link>
        ))}
      </nav>
    </LayoutGroup>
  );
});

DesktopMenu.displayName = "DesktopMenu";
