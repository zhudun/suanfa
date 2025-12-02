import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  speed,
  onPlay,
  onPause,
  onReset,
  onSpeedChange
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="
            w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600
            text-white flex items-center justify-center
            transition-all duration-200 hover:scale-110 shadow-lg
            focus:outline-none focus:ring-4 focus:ring-blue-300
          "
          aria-label={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? (
            <Pause size={24} />
          ) : (
            <Play size={24} className="ml-1" />
          )}
        </button>
        
        <button
          onClick={onReset}
          className="
            px-6 py-3 rounded-lg bg-gray-500 hover:bg-gray-600
            text-white flex items-center space-x-2
            transition-all duration-200 hover:scale-105 shadow-lg
            focus:outline-none focus:ring-4 focus:ring-gray-300
          "
          aria-label="重置"
        >
          <RotateCcw size={20} />
          <span>重置</span>
        </button>
      </div>
      
      <div className="flex items-center space-x-3 w-full max-w-xs">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">速度:</span>
        <div className="flex-1 flex items-center space-x-2">
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.5}
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="
              flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
          <span className="text-sm font-medium text-gray-600 min-w-[3rem]">
            {speed}x
          </span>
        </div>
      </div>
    </div>
  );
};