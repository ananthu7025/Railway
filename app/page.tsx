"use client";

import { useState } from "react";
import ReactHowler from "react-howler";
import {
  Pause,
  Play,
  Volume2,
  Volume1,
  Music,
  Users,
  TrainFront,
  CloudRain,
} from "lucide-react";
import TrainStatus from "@/components/LiveStation";
import TrainInfoSearch from "@/components/LiveStation";

interface SoundCardProps {
  label: string;
  Icon: React.ElementType;
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (value: number) => void;
}

const SoundCard: React.FC<SoundCardProps> = ({
  label,
  Icon,
  isPlaying,
  volume,
  onToggle,
  onVolumeChange,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Icon className="w-8 h-8 text-yellow-400 mb-4" />
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onToggle}
          className="bg-yellow-400 text-black p-3 rounded-full"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <span className="text-xl font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2 w-36">
        <Volume1 className="w-4 h-4 text-yellow-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-full accent-yellow-400"
        />
        <Volume2 className="w-4 h-4 text-yellow-400" />
      </div>
    </div>
  );
};

const SoundBoard = () => {
  const [isRainPlaying, setIsRainPlaying] = useState(false);
  const [isTrainPlaying, setIsTrainPlaying] = useState(false);
  const [isCrowdPlaying, setIsCrowdPlaying] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const [rainVolume, setRainVolume] = useState(40);
  const [trainVolume, setTrainVolume] = useState(20);
  const [crowdVolume, setCrowdVolume] = useState(50);
  const [musicVolume, setMusicVolume] = useState(70);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url('/train.jpeg')`,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
   <div className="rain-effect">
  {[...Array(100)].map((_, i) => (
    <div
      key={i}
      className="raindrop"
      style={{
        '--x': Math.random().toString(),
        '--d': Math.random().toString(),
      } as React.CSSProperties}
    />
  ))}
</div>
{Math.random() < 0.02 && <div className="lightning-flash" />}

      <h1 className="text-3xl md:text-5xl font-semibold text-center mb-12 text-yellow-100">
        മഴയത്ത് ഒരു ട്രെയിൻ യാത്ര...
      </h1>
  {/* <TrainInfoSearch/> */}
      {/* Audio Players */}
      <ReactHowler
        src="/sounds/rain.mp3"
        playing={isRainPlaying}
        volume={rainVolume / 100}
        loop={true}
      />
      <ReactHowler
        src="/sounds/train.mp3"
        playing={isTrainPlaying}
        volume={trainVolume / 100}
        loop={true}
      />
      <ReactHowler
        src="/sounds/music.mp3"
        playing={isMusicPlaying}
        volume={musicVolume / 100}
        loop={true}
      />
      <ReactHowler
        src="/sounds/crowd.mp3"
        playing={isCrowdPlaying}
        volume={crowdVolume / 100}
        loop={true}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        <SoundCard
          label="Rain"
          Icon={CloudRain}
          isPlaying={isRainPlaying}
          volume={rainVolume}
          onToggle={() => setIsRainPlaying((prev) => !prev)}
          onVolumeChange={(value) => setRainVolume(value)}
        />
        <SoundCard
          label="Train"
          Icon={TrainFront}
          isPlaying={isTrainPlaying}
          volume={trainVolume}
          onToggle={() => setIsTrainPlaying((prev) => !prev)}
          onVolumeChange={(value) => setTrainVolume(value)}
        />
        <SoundCard
          label="Music"
          Icon={Music}
          isPlaying={isMusicPlaying}
          volume={musicVolume}
          onToggle={() => setIsMusicPlaying((prev) => !prev)}
          onVolumeChange={(value) => setMusicVolume(value)}
        />
        <SoundCard
          label="Crowd"
          Icon={Users}
          isPlaying={isCrowdPlaying}
          volume={crowdVolume}
          onToggle={() => setIsCrowdPlaying((prev) => !prev)}
          onVolumeChange={(value) => setCrowdVolume(value)}
        />
      </div>
    </div>
  );
};

export default SoundBoard;
