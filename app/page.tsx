'use client'

import { useState } from "react";
import { ActivityGraph } from '@/components/ActivityGraph'
import image from '@/public/Worlds.webp'


export default function Home() {
  return (
    <div className="flex flex-col justify-center h-screen  p-24">
      <div className="flex justify-evenly items-center w-[1000px] m-auto">
        <div className="flex flex-col gap-4 w-1/2 items-center">
          <h1 className="font-[family-name:var(--font-oswald)] text-[96px] font-bold w-[200] md:w-[400px] lg:w-[550px]
          ">Road to Worlds 2025</h1>
          <span className="font-[family-name:var(--font-source_Serif_4)] font-semibold text-end w-[200] md:w-[400px] lg:w-[550px]">By Maurpz</span>
        </div>
        <div className="grid items-center">
          <img src={image.src} alt="worlds" className="invert transform rotate-x-12 rotate-y-12 h-[200px]"/>
        </div>
      </div>
      <ActivityGraph/>
    </div>
  );
}
