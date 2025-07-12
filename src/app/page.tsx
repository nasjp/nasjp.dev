"use client";

import Image from "next/image";
import MysticalEye from "../components/mystical-eye";

export default function Page() {
  return (
    <>
      <MysticalEye />
      <div className="flex items-center justify-center min-h-screen bg-white p-4">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/gohan.png"
            alt="Gohan"
            width={300}
            height={300}
            className="filter contrast-125 brightness-110 saturate-0"
          />
          <h1 className="text-5xl font-bold">nasjp.dev</h1>
        </div>
      </div>
    </>
  );
}
