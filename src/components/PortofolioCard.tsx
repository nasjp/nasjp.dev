"use client";

import Image from "next/image";
import { useState } from "react";

interface PortfolioCardProps {
  service: string;
  client: string;
  role: string;
  link: string;
  description: string;
  image: string;
}

export function PortfolioCard({
  service,
  client,
  role,
  link,
  description,
  image,
}: PortfolioCardProps) {
  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040]">
      <div className="mb-2 bg-[#000080] text-white border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040] p-1 text-xs px-2 py-1 m-1">
        <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2">{service}</h3>
        <span className="text-xs">{client}</span>
      </div>
      <div className="flex-grow p-1">
        <div className="aspect-video relative mb-2 border border-[#808080]">
          <Image
            src={image}
            alt={`${service} サムネイル`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex justify-start">
          <div className="mb-2 bg-[#c0c0c0] text-black border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040] p-1 text-xs md:text-sm px-2 py-1">
            {role}
          </div>
        </div>

        <div className="bg-[#c0c0c0] border-2 border-[#dfdfdf] border-b-[#404040] border-r-[#404040] p-1">
          <p className="text-xs md:text-sm text-black bg-white border border-[#808080] p-2">
            {description}
          </p>
        </div>
      </div>
      <div className="p-1">
        {link === "COMING SOON..." ? (
          <span className="block w-full h-6 text-xs text-center leading-6 cursor-not-allowed">
            COMING SOON...
          </span>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-6 text-xs text-center leading-6 text-blue-600 hover:underline"
          >
            プロジェクトを見る
          </a>
        )}
      </div>
    </div>
  );
}
