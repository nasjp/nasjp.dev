"use client";

import Image from "next/image";

interface ProfileSceneProps {
  showProfile: boolean;
}

export default function ProfileScene({ showProfile }: ProfileSceneProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-white p-0 sm:p-4 ${
        showProfile ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transition: "opacity 5s ease-in-out",
      }}
    >
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-[60vw] h-[60vw] sm:w-[300px] sm:h-[300px] flex items-center justify-center">
          <Image
            src="/gohan.webp"
            alt="Gohan"
            width={360}
            height={343}
            loading="lazy"
            className="w-full h-auto max-h-full object-contain filter contrast-125 brightness-110 saturate-0"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold">nasjp.dev</h1>
        <p className="text-sm text-gray-600 text-center max-w-md leading-relaxed">
          Software engineer, looking for
          <br />
          an adrenaline-pumping opportunity
        </p>
      </div>
    </div>
  );
}
