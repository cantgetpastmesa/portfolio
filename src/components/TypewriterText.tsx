"use client";
import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = "",
  speed = 50,
  delay = 0,
  as: Component = "span",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Reset state when text changes (e.g., language switch)
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setHasStarted(false);
  }, [text]);

  useEffect(() => {
    // Start after delay
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay, text]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, hasStarted]);

  return <Component className={className}>{displayedText}</Component>;
};
