"use client";

import { useMemo } from "react";

interface CircleProps {
  circleNumber: number;
  solutionSlice: number; // 0–5
  size: number; // px
  value?: string[];
  onChange?: (sliceIndex: number, letter: string) => void;
}

export default function Circle({
  circleNumber,
  solutionSlice,
  size,
  value = ["", "", "", "", "", ""],
  onChange,
}: CircleProps) {
  const radius = size / 2;
  const sliceAngle = 60;
  const rotationOffset = -30; // Start slice 0 at 330°

  const slices = useMemo(() => {
    return [...Array(6)].map((_, i) => {
      const startDeg = rotationOffset + i * sliceAngle;
      const endDeg = rotationOffset + (i + 1) * sliceAngle;

      const startRad = (startDeg - 90) * (Math.PI / 180);
      const endRad = (endDeg - 90) * (Math.PI / 180);

      const x1 = radius + radius * Math.cos(startRad);
      const y1 = radius + radius * Math.sin(startRad);
      const x2 = radius + radius * Math.cos(endRad);
      const y2 = radius + radius * Math.sin(endRad);

      const midRad = (startRad + endRad) / 2;
      const inputX = radius + (radius * 0.70) * Math.cos(midRad);
      const inputY = radius + (radius * 0.70) * Math.sin(midRad);

      return {
        index: i,
        path: `
          M ${radius} ${radius}
          L ${x1} ${y1}
          A ${radius} ${radius} 0 0 1 ${x2} ${y2}
          Z
        `,
        inputX,
        inputY,
      };
    });
  }, [radius]);

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center"
    >
      {/* SVG but NOT clickable */}
      <svg width={size} height={size} className="pointer-events-none z-0 absolute">
        {slices.map((s) => (
          <path
            key={s.index}
            d={s.path}
            className="fill-neutral-100 stroke-neutral-400 pointer-events-none"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Center mini-circle */}
      <div
        className="
          absolute flex items-center justify-center
          w-10 h-10 rounded-full 
          bg-cyan-400 text-neutral-800 font-bold text-sm shadow
        "
        style={{
          left: radius,
          top: radius,
          transform: "translate(-50%, -50%)",
        }}
      >
        {circleNumber}
      </div>

      {/* Larger inputs, now fully clickable */}
      {slices.map((s) => (
        <input
          key={s.index}
          maxLength={1}
          value={value[s.index] ?? ""}
          onChange={(e) =>
            onChange?.(s.index, e.target.value.toUpperCase())
          }
          className={`
            absolute w-11 h-11 text-center text-2xl font-semibold 
            bg-white rounded-md outline-none
            pointer-events-auto
            border shadow-sm z-10 text-gray-900 uppercase
            ${
              s.index === solutionSlice
                ? "border-cyan-300 focus:border-cyan-600"
                : "border-neutral-400 focus:border-neutral-600"
            }
          `}
          style={{
            left: s.inputX,
            top: s.inputY,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}
