"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="google-sans-code text-2xl md:text-4xl lg:text-7xl text-white text-center">
        Felipe A. Mesa N.
      </p>
      <p className="bitcount text-4xl md:text-4xl mt-4 text-white text-center">
        Bienvenido a mi portafolio.
      </p>
    </WavyBackground>
  );
}