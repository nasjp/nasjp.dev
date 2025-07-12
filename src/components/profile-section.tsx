import Image from "next/image";

export default function ProfileSection() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-0 sm:p-4">
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-[60vw] h-[60vw] sm:w-[300px] sm:h-[300px]">
          <Image
            src="/gohan.png"
            alt="Gohan"
            width={300}
            height={300}
            className="w-full h-full filter contrast-125 brightness-110 saturate-0"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold">nasjp.dev</h1>
      </div>
    </div>
  );
}
