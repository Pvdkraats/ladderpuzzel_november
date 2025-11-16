"use client";

import { useState, useEffect, useRef } from "react";
import WaveLayout from './components/waveLayout';
import DescriptionList from './components/descriptionList';
import SolutionBar from './components/solutionsBar';
import GameInfo from "./components/gameInfo";

export default function Page() {
  const [hoveredCircles, setHoveredCircles] = useState<number[]>([]);
  const [puzzleHeight, setPuzzleHeight] = useState<number>(800);

  const puzzleRef = useRef<HTMLDivElement>(null);

  // Measure puzzle height so the description list can match it
  useEffect(() => {
    if (puzzleRef.current) {
      setPuzzleHeight(puzzleRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center bg-slate-100 p-6">
      <div className="w-full max-w-[1700px]">

        {/* Game info spans full width of the centered container */}
        <div className="mb-6 px-4">
          <GameInfo />
        </div>

        <div className="flex flex-row gap-10 w-full">

          {/* LEFT — PUZZLE */}
          <div ref={puzzleRef} className="flex flex-col flex-1 items-center">
            <WaveLayout highlighted={hoveredCircles} />

            {/* Solution Bar goes UNDER the puzzle */}
            <div className="mt-8 w-full ml-8">
              <SolutionBar onHover={(nums) => setHoveredCircles(nums)} />
            </div>
          </div>

          {/* RIGHT — DESCRIPTION LIST (scrolls inside fixed height box) */}
          <div
            className="w-[450px] overflow-y-auto px-2"
            style={{ maxHeight: puzzleHeight }}
          >
            <DescriptionList onHoverCircles={setHoveredCircles} />
          </div>
        </div>
      </div>
    </div>
  );
}
