"use client";

import { useEffect, useState } from "react";
import Circle from "./Circle";

const TOTAL_CIRCLES = 25;
const EMPTY_CIRCLE = ["", "", "", "", "", ""];

export default function PuzzleBoard() {
  const [circles, setCircles] = useState<string[][]>(
    Array(TOTAL_CIRCLES).fill(EMPTY_CIRCLE)
  );

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("puzzleState");
    if (saved) {
      setCircles(JSON.parse(saved));
    }
  }, []);

  // Save every time the user types something
  useEffect(() => {
    localStorage.setItem("puzzleState", JSON.stringify(circles));
  }, [circles]);

  // Handler passed to Circle
  const updateLetter = (circleIndex: number, sliceIndex: number, letter: string) => {
    setCircles((prev) => {
      const newState = prev.map((c, i) =>
        i === circleIndex
          ? c.map((s, j) => (j === sliceIndex ? letter : s))
          : c
      );
      return newState;
    });
  };

  return (
    <div className="grid grid-cols-5 gap-6">
      {circles.map((circleValue, i) => (
        <Circle
          key={i}
          circleNumber={i + 1}
          solutionSlice={2}  // example
          size={200}
          value={circleValue}
          onChange={(sliceIndex, letter) =>
            updateLetter(i, sliceIndex, letter)
          }
        />
      ))}
    </div>
  );
}
