"use client";

import { useEffect, useState, useRef } from "react";

/**
 * SolutionBar component
 *
 * - Reads "puzzleState" from localStorage (array of 25 arrays of 6 letters)
 * - Uses the same mapping of circleNumber -> solutionSliceIndex (duplicate)
 * - Renders 25 readonly boxes showing the letter from each circle's solution slice
 * - Calls onHover([circleNumber]) when hovering a box (and onHover([]) on leave)
 */

const DEFAULT_TOTAL = 25;

// Keep the same mapping you've used in WaveLayout
const solutionSliceMap: Record<number, number> = {
  1: 0, 2: 2, 3: 3, 4: 0, 5: 5,
  6: 5, 7: 3, 8: 4, 9: 3, 10: 0,
  11: 5, 12: 4, 13: 0, 14: 2, 15: 2,
  16: 4, 17: 4, 18: 4, 19: 3, 20: 4,
  21: 4, 22: 1, 23: 3, 24: 4, 25: 3,
};

type SolutionBarProps = {
  onHover?: (circleNumbers: number[]) => void;
  total?: number;
};

export default function SolutionBar({ onHover, total = DEFAULT_TOTAL }: SolutionBarProps) {
  const [letters, setLetters] = useState<string[]>(Array.from({ length: total }, () => ""));
  const mounted = useRef(false);

  // read puzzle state from localStorage and map to solution letters
  const readFromStorage = () => {
    try {
      const raw = localStorage.getItem("puzzleState");
      if (!raw) {
        setLetters(Array.from({ length: total }, () => ""));
        return;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length < total) {
        setLetters(Array.from({ length: total }, () => ""));
        return;
      }

      const next = Array.from({ length: total }, (_, i) => {
        const circleNumber = i + 1;
        const sliceIndex = solutionSliceMap[circleNumber] ?? 0;
        const circleArr: string[] = parsed[i] ?? ["", "", "", "", "", ""];
        const ch = circleArr[sliceIndex] ?? "";
        return (typeof ch === "string" ? ch.toUpperCase().slice(0, 1) : "");
      });

      setLetters(next);
    } catch {
      setLetters(Array.from({ length: total }, () => ""));
    }
  };

  useEffect(() => {
    mounted.current = true;
    readFromStorage();

    // Listen for storage events (other tabs) and updates
    const handler = (e: StorageEvent) => {
      if (e.key === "puzzleState") readFromStorage();
    };
    window.addEventListener("storage", handler);

    // Poll occasionally while mounted to ensure live updates from same-tab writes (since WaveLayout writes localStorage)
    const poll = setInterval(readFromStorage, 600);

    return () => {
      mounted.current = false;
      clearInterval(poll);
      window.removeEventListener("storage", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <div className="flex flew-row flex-wrap gap-2 items-start">
        {letters.map((l, idx) => {
          const circleNumber = idx + 1;
          return (
            <div
              key={circleNumber}
              onMouseEnter={() => onHover?.([circleNumber])}
              onMouseLeave={() => onHover?.([])}
              className="flex items-center justify-center"
              title={`Circle ${circleNumber}`}
            >
              <div
                className="flex w-16 h-16 rounded-md bg-white border border-gray-300 text-3xl font-semibold text-gray-900 items-center justify-center shadow-sm uppercase"
                // cyan border if that slice is the linked one visually (optional)
                style={{
                  // subtle cyan if linked to solution (keeps consistency)
                  borderColor: "#000000",
                }}
              >
                {l || ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
