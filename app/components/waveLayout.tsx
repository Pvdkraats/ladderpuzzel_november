"use client";

import Circle from "./Circle";
import { useEffect, useState, useMemo } from "react";

// You can reorder these to rearrange the entire layout visually
const circleOrder = [
  20, 4, 6, 9, 12,
  21, 23, 8, 17, 19,
  5, 11, 18, 16, 24,
  25, 2, 7, 22, 3,
  10, 1, 13, 15, 14,
];

// Highlighted slices per circle number (your provided map)
const highlightedSlices: Record<number, number> = {
  1: 0, 2: 2, 3: 3, 4: 0, 5: 5,
  6: 5, 7: 3, 8: 4, 9: 3, 10: 0,
  11: 5, 12: 4, 13: 0, 14: 2, 15: 2,
  16: 4, 17: 4, 18: 4, 19: 3, 20: 4,
  21: 4, 22: 1, 23: 3, 24: 4, 25: 3,
};

// Layout constants
const TOTAL = 25;
const COLUMNS = 5;
const ROWS = 5;
const CIRCLE_SIZE = 200; // px
const HORIZONTAL_GAP_FACTOR = 0.9;
const VERTICAL_OFFSET = CIRCLE_SIZE * 0.85;
const verticalMargin = 40;

export default function WaveLayout({ highlighted = [] }: { highlighted?: number[] }) {
  const [circles, setCircles] = useState<string[][]>(
    Array.from({ length: TOTAL }, () => ["", "", "", "", "", ""])
  );

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("puzzleState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === TOTAL) {
          setCircles(parsed);
        }
      } catch {}
    }
  }, []);

  // Save state
  useEffect(() => {
    localStorage.setItem("puzzleState", JSON.stringify(circles));
  }, [circles]);

  const updateLetter = (circleNumber: number, sliceIndex: number, letter: string) => {
    const i = circleNumber - 1;
    setCircles((prev) => {
      const next = prev.map((c) => [...c]);
      next[i][sliceIndex] = letter;
      return next;
    });
  };

  // calculate container height
  const containerHeight = useMemo(() => {
    const base = (ROWS - 1) * VERTICAL_OFFSET + (ROWS - 1) * verticalMargin + CIRCLE_SIZE;
    return base + CIRCLE_SIZE / 2;
  }, []);

  return (
    <div className="relative w-full" style={{ height: containerHeight }}>
      {circleOrder.map((circleNumber, index) => {
        const column = Math.floor(index / ROWS);
        const row = index % ROWS;
        const isOffsetColumn = column === 1 || column === 3;

        const left = column * (CIRCLE_SIZE * HORIZONTAL_GAP_FACTOR);
        const top = row * (VERTICAL_OFFSET + verticalMargin) + (isOffsetColumn ? CIRCLE_SIZE / 2 : 0);

        const isHighlighted = highlighted.includes(circleNumber);

        return (
          <div
            key={circleNumber}
            className="absolute"
            style={{ left, top, width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
          >
            <div
              className={isHighlighted ? "rounded-full shadow-[0_0_10px_orange]" : ""}
              style={{ width: "100%", height: "100%" }}
            >
              <Circle
                circleNumber={circleNumber}
                solutionSlice={highlightedSlices[circleNumber]}
                size={CIRCLE_SIZE}
                value={circles[circleNumber - 1]}
                onChange={(sliceIndex, letter) =>
                  updateLetter(circleNumber, sliceIndex, letter)
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}