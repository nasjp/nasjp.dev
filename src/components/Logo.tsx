import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <svg
        viewBox="0 0 400 150"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="title description"
        role="img"
        width="400"
        height="150"
      >
        <title id="title">nasjp.dev</title>
        <desc id="description">nasjp.dev</desc>

        <defs>
          <pattern
            id="texture"
            x="0"
            y="0"
            width="2"
            height="2"
            patternUnits="userSpaceOnUse"
          >
            <path d="M1 0L0 1M1 1L2 0" stroke="#E5E7EB" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#F3F4F6" />
        <rect width="100%" height="100%" fill="url(#texture)" />

        <rect
          x="5"
          y="5"
          width="390"
          height="140"
          stroke="black"
          strokeWidth="2"
          fill="none"
          rx="3"
          ry="3"
        />

        <text
          x="50"
          y="30"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          P
        </text>

        <text
          x="100"
          y="30"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          R
        </text>

        <text
          x="150"
          y="30"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          O
        </text>
        <text
          x="200"
          y="30"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          D
        </text>
        <text
          x="250"
          y="30"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          U
        </text>
        <text
          x="300"
          y="30"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          C
        </text>

        <text
          x="350"
          y="30"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          T
        </text>

        <text
          x="200"
          y="88"
          fontSize="52"
          fontWeight="bold"
          fontFamily="Times New Roman, serif"
          textAnchor="middle"
          fill="black"
        >
          nasjp.dev
        </text>

        <circle cx="205" cy="78" r="10" fill="#4A90E2" opacity="0.8" />
        <circle cx="213" cy="74" r="2.5" fill="#4A90E2" />

        <text
          x="50"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          D
        </text>

        <text
          x="80"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          E
        </text>

        <text
          x="110"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          V
        </text>

        <text
          x="170"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          S
        </text>

        <text
          x="200"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          E
        </text>

        <text
          x="230"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          R
        </text>

        <text
          x="260"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          V
        </text>

        <text
          x="294"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          I
        </text>

        <text
          x="320"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          C
        </text>

        <text
          x="350"
          y="125"
          fontSize="16"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="black"
        >
          E
        </text>
      </svg>
    </div>
  );
};
