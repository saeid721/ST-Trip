"use client";

import Image from "next/image";

interface FlightRoute {
  id: string;
  code: string;
  from: string;
  to: string;
  path: string; // SVG path string
  dur: string;  // Duration e.g. "18s"
  startDot: { x: number; y: number };
  endDot: { x: number; y: number };
}

// 10 Global SVG Flight Routes mapped across 1000x550 viewBox coordinates
const flightRoutes: FlightRoute[] = [
  {
    id: "f1",
    code: "ST-101",
    from: "JFK",
    to: "LHR",
    path: "M 220 200 Q 340 100 460 130",
    dur: "18s",
    startDot: { x: 220, y: 200 },
    endDot: { x: 460, y: 130 },
  },
  {
    id: "f2",
    code: "ST-202",
    from: "LHR",
    to: "DXB",
    path: "M 460 130 Q 550 160 640 230",
    dur: "15s",
    startDot: { x: 460, y: 130 },
    endDot: { x: 640, y: 230 },
  },
  {
    id: "f3",
    code: "ST-303",
    from: "DXB",
    to: "SIN",
    path: "M 640 230 Q 725 250 810 300",
    dur: "19s",
    startDot: { x: 640, y: 230 },
    endDot: { x: 810, y: 300 },
  },
  {
    id: "f4",
    code: "ST-404",
    from: "HND",
    to: "LAX",
    path: "M 880 165 C 600 40 400 40 180 210",
    dur: "24s",
    startDot: { x: 880, y: 165 },
    endDot: { x: 180, y: 210 },
  },
  {
    id: "f5",
    code: "ST-505",
    from: "CDG",
    to: "HND",
    path: "M 490 150 Q 685 40 880 165",
    dur: "22s",
    startDot: { x: 490, y: 150 },
    endDot: { x: 880, y: 165 },
  },
  {
    id: "f6",
    code: "ST-606",
    from: "SYD",
    to: "SIN",
    path: "M 850 415 Q 830 350 810 300",
    dur: "14s",
    startDot: { x: 850, y: 415 },
    endDot: { x: 810, y: 300 },
  },
  {
    id: "f7",
    code: "ST-707",
    from: "GRU",
    to: "MAD",
    path: "M 330 360 Q 405 270 480 180",
    dur: "21s",
    startDot: { x: 330, y: 360 },
    endDot: { x: 480, y: 180 },
  },
  {
    id: "f8",
    code: "ST-808",
    from: "CAI",
    to: "JNB",
    path: "M 580 230 Q 600 310 570 400",
    dur: "16s",
    startDot: { x: 580, y: 230 },
    endDot: { x: 570, y: 400 },
  },
  {
    id: "f9",
    code: "ST-909",
    from: "SEA",
    to: "MIA",
    path: "M 150 150 Q 200 200 260 250",
    dur: "13s",
    startDot: { x: 150, y: 150 },
    endDot: { x: 260, y: 250 },
  },
  {
    id: "f10",
    code: "ST-100",
    from: "FRA",
    to: "BKK",
    path: "M 520 140 Q 650 180 780 260",
    dur: "20s",
    startDot: { x: 520, y: 140 },
    endDot: { x: 780, y: 260 },
  },
];

export function WorldMapFlights() {
  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-xl overflow-hidden">
      {/* 1. Custom Dotted World Map Asset */}
      <Image
        src="/images/world-map.png"
        alt="Dotted World Map"
        fill
        className="object-contain p-2 opacity-90 select-none"
        priority
      />


      {/* 3. Native SVG Flight Routes & animateMotion Engine */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none z-10"
        viewBox="0 0 1000 550"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Destination Target Pulse Markers */}
        {flightRoutes.map((route) => (
          <g key={`markers-${route.id}`}>
            {/* Origin Dot */}
            <circle
              cx={route.startDot.x}
              cy={route.startDot.y}
              r="3.5"
              fill="#94a3b8"
              opacity="0.7"
            />
            {/* Destination Target Pulse */}
            <circle
              cx={route.endDot.x}
              cy={route.endDot.y}
              r="4"
              fill="#2563eb"
            />
            <circle
              cx={route.endDot.x}
              cy={route.endDot.y}
              r="9"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                values="4;14;4"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.8;0;0.8"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Flight Arcs and Native animateMotion Aircrafts */}
        {flightRoutes.map((route) => (
          <g key={route.id}>
            {/* Dashed SVG Flight Path */}
            <path
              d={route.path}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.45"
            />

            {/* Aircraft image with native SVG animateMotion rotate="auto" */}
            <image
              href="/images/aircraft.png"
              width="24"
              height="24"
              x="-12"
              y="-12"
              style={{ filter: "drop-shadow(0px 2px 4px rgba(15,23,42,0.3))" }}
            >
              <animateMotion
                path={route.path}
                dur={route.dur}
                repeatCount="indefinite"
                rotate="auto"
                calcMode="linear"
              />
            </image>
          </g>
        ))}
      </svg>
    </div>
  );
}