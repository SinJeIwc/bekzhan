"use client";

import { useEffect, useState } from "react";

const roles = [
  "Frontend Developer",
  "Software Engineer",
  "React Specialist",
  "Creative Technologist",
  "TypeScript Enthusiast",
  "UI/UX Advocate",
];

export function RotatingRoles() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <div className="flex h-16 items-center">
      <p className="font-mono text-muted-foreground text-xl md:text-2xl">
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}
