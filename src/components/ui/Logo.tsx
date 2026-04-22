import React from "react";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex flex-col items-center justify-center`}>
      <svg
        viewBox="0 -10 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Shadow */}
        <g opacity="0.6">
          <ellipse cx="50" cy="100" rx="30" ry="8" fill="url(#shadowGrad)" />
          <defs>
            <radialGradient
              id="shadowGrad"
              cx="0.5"
              cy="0.5"
              r="0.5"
              fx="0.5"
              fy="0.5"
            >
              <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
        </g>

        {/* Cube Wireframe */}
        <g
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white group-hover:text-accent transition-colors duration-300"
        >
          {/* Top Face */}
          <polygon points="50,15 80,30 50,45 20,30" />
          {/* Left Face */}
          <polygon points="20,30 50,45 50,75 20,60" />
          {/* Right Face */}
          <polygon points="50,45 80,30 80,60 50,75" />
        </g>
      </svg>
    </div>
  );
}
