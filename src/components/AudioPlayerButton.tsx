import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playFrenchAudio } from '../utils/audio';

interface AudioPlayerButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  text,
  className = '',
  size = 'md'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    playFrenchAudio(text, () => {
      setIsPlaying(false);
    });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2.5 text-sm',
    lg: 'p-3.5 text-base'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  return (
    <button
      onClick={handleClick}
      title="Nghe phát âm tiếng Pháp bản xứ"
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 active:scale-95 ${
        isPlaying
          ? 'bg-rose-500 text-white shadow-glow scale-105'
          : 'bg-rose-50 text-rose-600 hover:bg-rose-100 hover:scale-105'
      } ${sizeClasses[size]} ${className}`}
    >
      <Volume2
        size={iconSizes[size]}
        className={isPlaying ? 'animate-pulse' : ''}
      />
    </button>
  );
};
