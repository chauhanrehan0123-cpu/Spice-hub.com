import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  textColor?: string;
  badgeColor?: string;
}

export default function SpiceHubLogo({
  className = "",
  size = 120,
  textColor = "#ffffff",
  badgeColor = "#73261D", // Rich brick-espresso brown from the logo
}: LogoProps) {
  return (
    <svg
      id="spice-hub-logo-svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Paths for circular text wrapping */}
        {/* Top Text Path (clockwise around top) */}
        <path
          id="text-path-top"
          d="M 25 100 A 75 75 0 0 1 175 100"
          fill="none"
        />
        {/* Bottom Text Path (clockwise around bottom) */}
        <path
          id="text-path-bottom"
          d="M 175 100 A 75 75 0 0 1 25 100"
          fill="none"
        />
      </defs>

      {/* Outer White Ring */}
      <circle cx="100" cy="100" r="94" fill="none" stroke="#ffffff" strokeWidth="2.5" />

      {/* Main Solid Brown Ring */}
      <circle cx="100" cy="100" r="80" fill={badgeColor} stroke="#ffffff" strokeWidth="4" />

      {/* Inner White Circle Ring */}
      <circle cx="100" cy="100" r="54" fill="none" stroke="#ffffff" strokeWidth="2" />

      {/* Inner Solid White Center Circle */}
      <circle cx="100" cy="100" r="48" fill="#ffffff" />

      {/* Top Text: SPICE HUB */}
      <text fill={textColor} className="font-display font-black text-[21px] tracking-[0.25em]" textAnchor="middle">
        <textPath href="#text-path-top" startOffset="50%">
          SPICE HUB
        </textPath>
      </text>

      {/* Bottom Text: RESTRO CAFÉ */}
      <text fill={textColor} className="font-display font-bold text-[16px] tracking-[0.18em]" textAnchor="middle">
        <textPath href="#text-path-bottom" startOffset="50%">
          RESTRO CAFÉ
        </textPath>
      </text>

      {/* Center Icon: Stylized coffee cup with vertical slats and steam */}
      <g transform="translate(72, 70) scale(0.28)" stroke={badgeColor} strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Steam */}
        <path d="M100,20 C105,5 95,-10 100,-25" strokeWidth="8" />
        <path d="M80,25 C85,12 75,0 80,-15" strokeWidth="6" />
        <path d="M120,23 C125,10 115,2 120,-13" strokeWidth="6" />

        {/* Cup Lid & Rim */}
        <path d="M50,40 L150,40" strokeWidth="14" />
        <path d="M60,55 L140,55" strokeWidth="10" />

        {/* Cup Body */}
        <path d="M65,55 L75,140 Q77,155 100,155 Q123,155 125,140 L135,55" strokeWidth="10" />

        {/* Stylized Arch / Fireplace Inside the Cup base */}
        {/* The arched base representation inside the cup */}
        <path d="M82,155 L82,120 A18,18 0 0 1 118,120 L118,155" strokeWidth="8" />

        {/* Slat Lines representing the brick details / timber ribs */}
        <line x1="74" y1="75" x2="126" y2="75" strokeWidth="8" />
        <line x1="76" y1="92" x2="124" y2="92" strokeWidth="6" />
        <line x1="78" y1="108" x2="122" y2="108" strokeWidth="6" />
      </g>
    </svg>
  );
}
