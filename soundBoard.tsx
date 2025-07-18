// components/SoundBoard.tsx
"use client";

import { useState } from "react";
import { Pause, Play, Train, Music, Volume2, Users } from "lucide-react";

const SoundBoard = () => {
  const [isRainPlaying, setIsRainPlaying] = useState(true);
  const [rainVolume, setRainVolume] = useState(70);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url('/kerala-train-bg.jpg')`, // Place image in public folder
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
      <h1 className="text-3xl md:text-5xl font-semibold text-center mb-12 text-yellow-100">
        മഴയത്ത് ഒരു ട്രെയിൻ യാത്ര...
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Rain Control */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setIsRainPlaying(!isRainPlaying)}
            className="bg-white/10 hover:bg-white/20 p-4 rounded-full mb-2"
          >
            {isRainPlaying ? <Pause className="text-yellow-300" /> : <Play className="text-yellow-300" />}
          </button>
          <div className="text-sm font-medium text-yellow-100">Rain</div>
          <input
            type="range"
            min="0"
            max="100"
            value={rainVolume}
            onChange={(e) => setRainVolume(Number(e.target.value))}
            className="mt-2 w-24"
          />
        </div>

        {/* Train */}
        <div className="flex flex-col items-center">
          <button className="bg-white/10 hover:bg-white/20 p-4 rounded-full mb-2">
            <Train className="text-yellow-300" />
          </button>
          <div className="text-sm font-medium text-yellow-100">Train</div>
        </div>

        {/* Music */}
        <div className="flex flex-col items-center">
          <button className="bg-white/10 hover:bg-white/20 p-4 rounded-full mb-2">
            <Music className="text-yellow-300" />
          </button>
          <div className="text-sm font-medium text-yellow-100">Music</div>
        </div>

        {/* Crowd */}
        <div className="flex flex-col items-center">
          <button className="bg-white/10 hover:bg-white/20 p-4 rounded-full mb-2">
            <Users className="text-yellow-300" />
          </button>
          <div className="text-sm font-medium text-yellow-100">Crowd</div>
        </div>
      </div>
    </div>
  );
};

export default SoundBoard;
