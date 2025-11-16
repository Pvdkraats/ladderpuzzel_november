"use client";

import React, { useState } from "react";

const descriptions = [
  "plaats in Gelderland(R)",
  "beker(L)",
  "Midden-Amerikaan(L)",
  "klus(R)",
  "voetbalterm(R)",
  "gesteente(R)",
  "alcoholische drank(L)",
  "dichtdoen(R)",
  "tropische vrucht(L)",
  "zacht en rond(L)",
  "onbekwaam persoon(R)",
  "gezamenlijke werken(L)",
  "achteruit kijken(R)",
  "deel van het gezicht(L)",
  "verdovend middel(R)",
  "vogelvrije(L)",
  "platte schotel(L)",
  "grassteppe(R)",
  "klopjacht(R)",
  "filmscenario(R)",
  "goede afloop, uitkomst(R)",
  "toevluchtsoord(R)",
  "dierenverblijf(L)",
  "carrièremaker(R)",
  "plaats in de Achterhoek (L)"
];

interface DescriptionListProps {
  onHoverCircles: (circleNumbers: number[]) => void;
}

export default function DescriptionList({
  onHoverCircles,
}: DescriptionListProps) {
  const [completed, setCompleted] = useState(
    Array(descriptions.length).fill(false)
  );
  const [links, setLinks] = useState(Array(descriptions.length).fill(""));

  const toggleCompleted = (i: number) => {
    setCompleted((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const updateLink = (i: number, value: string) => {
    setLinks((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };

  // NEW: parse comma-separated list (e.g. "1,4,12")
  const parseCircleList = (raw: string): number[] => {
    if (!raw) return [];

    return raw
      .split(",") // split commas
      .map((x) => x.trim()) // remove spaces
      .filter((x) => x !== "") // ignore empty
      .map((x) => Number(x)) // convert to number
      .filter((n) => Number.isFinite(n) && n >= 1 && n <= 25); // only valid circles
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {descriptions.map((desc, i) => (
        <div
          key={i}
          onMouseEnter={() => onHoverCircles(parseCircleList(links[i]))}
          onMouseLeave={() => onHoverCircles([])}
          className={`flex items-center justify-between p-3 rounded-xl border shadow-sm transition-all ${
            completed[i]
              ? "bg-green-100 border-green-400 text-gray-900"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <div className="flex flex-col">
            <span className="font-medium">{desc}</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={links[i]}
              onChange={(e) => updateLink(i, e.target.value)}
              className="w-20 p-1 text-center border rounded-md"
              placeholder="#"
            />

            <button
              onClick={() => toggleCompleted(i)}
              className={`px-3 py-1 rounded-md border text-md font-bold transition-all ${
                completed[i]
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-gray-200 border-gray-400"
              }`}
            >
              {completed[i] ? "✔" : "✔"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
