import React, { useState } from 'react';
import { DIALOGUES_DATA } from '../data/frenchData';
import { DialogueScenario } from '../types';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { 
  MessageSquare, 
  MapPin, 
  Eye, 
  EyeOff, 
  Volume2, 
  Sparkles, 
  Coffee, 
  Compass 
} from 'lucide-react';

export const DialoguePage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<DialogueScenario>(DIALOGUES_DATA[0]);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
          <MessageSquare size={14} />
          <span>Hội thoại thực tế tại Paris</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Giao Tiếp Thực Địa Parisienne
        </h1>
        <p className="text-sm text-slate-600">
          Nghe phát âm chuẩn từng câu thoại và tập nhập vai cùng người bản xứ
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DIALOGUES_DATA.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenario(sc)}
              className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-700 bg-blue-50/70 shadow-md ring-1 ring-blue-700'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                  {sc.level}
                </span>
                <span className="text-xs text-slate-600 flex items-center gap-1">
                  <MapPin size={13} className="text-rose-600" />
                  {sc.location}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 mt-2">
                {sc.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {sc.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Dialogue Chat Box */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden">
        
        {/* Chat Top Bar */}
        <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-base font-bold text-slate-900">
              {selectedScenario.title}
            </h2>
            <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-rose-600" />
              <span>{selectedScenario.location}</span>
            </p>
          </div>

          {/* Toggle Subtitles */}
          <button
            onClick={() => setShowSubtitles(!showSubtitles)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-semibold text-slate-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {showSubtitles ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{showSubtitles ? 'Ẩn phụ đề tiếng Việt' : 'Hiện phụ đề'}</span>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="p-6 sm:p-8 space-y-6 bg-radial from-stone-50/50 to-white min-h-[400px]">
          {selectedScenario.lines.map((line, idx) => {
            const isMe = line.isUser;
            return (
              <div
                key={idx}
                className={`flex items-start gap-3.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                  {line.avatar}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-lg rounded-3xl p-4.5 space-y-1.5 shadow-xs ${
                    isMe
                      ? 'bg-blue-700 text-white rounded-tr-xs'
                      : 'bg-stone-100 text-slate-900 rounded-tl-xs border border-stone-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-[11px] font-bold ${isMe ? 'text-blue-200' : 'text-slate-600'}`}>
                      {line.speaker}
                    </span>
                    <AudioPlayerButton
                      text={line.french}
                      size="sm"
                      className={isMe ? 'bg-white/20 text-white hover:bg-white/30' : ''}
                    />
                  </div>

                  <p className="font-serif text-base sm:text-lg font-medium leading-relaxed">
                    {line.french}
                  </p>

                  {showSubtitles && (
                    <p
                      className={`text-xs pt-1 border-t ${
                        isMe ? 'border-blue-600 text-blue-100' : 'border-stone-200 text-slate-600'
                      }`}
                    >
                      {line.vietnamese}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
