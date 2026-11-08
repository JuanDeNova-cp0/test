import React, { useState } from 'react';
import { FLASHCARDS_DATA } from '../data/frenchData';
import { useAuth } from '../context/AuthContext';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { 
  Layers, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Star, 
  Check, 
  Sparkles, 
  Volume2 
} from 'lucide-react';

export const FlashcardsPage: React.FC = () => {
  const { user, addXP, toggleBookmark } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const categories = ['ALL', 'Chào hỏi', 'Ẩm thực', 'Đời sống', 'Văn hóa', 'Du lịch'];

  const filteredCards = selectedCategory === 'ALL'
    ? FLASHCARDS_DATA
    : FLASHCARDS_DATA.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isBookmarked = currentCard ? user?.bookmarkedCards.includes(currentCard.id) : false;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const handleMastered = () => {
    addXP(10);
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold">
          <Layers size={14} />
          <span>Phương pháp Lặp lại ngắt quãng (Spaced Repetition)</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Thẻ Từ Vựng Flashcards 3D
        </h1>
        <p className="text-sm text-slate-600">
          Chạm vào thẻ để lật xem định nghĩa tiếng Việt và ví dụ ngữ cảnh
        </p>
      </div>

      {/* Categories */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white shadow-sm scale-105'
                : 'bg-white border border-stone-200 text-slate-600 hover:bg-stone-50'
            }`}
          >
            {cat === 'ALL' ? 'Tất cả chủ đề' : cat}
          </button>
        ))}
      </div>

      {/* Flashcard Component */}
      {currentCard && (
        <div className="flex flex-col items-center">
          
          {/* Card Counter & Bookmark */}
          <div className="w-full max-w-lg flex items-center justify-between text-xs font-bold text-slate-600 mb-3 px-2">
            <span>
              Thẻ {currentIndex + 1} / {filteredCards.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="bg-stone-100 px-2.5 py-1 rounded-lg text-slate-700">
                {currentCard.category} • {currentCard.level}
              </span>
              <button
                onClick={() => toggleBookmark(currentCard.id)}
                title="Đánh dấu từ yêu thích"
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isBookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-600 hover:text-slate-600'
                }`}
              >
                <Star size={18} className={isBookmarked ? 'fill-amber-400 text-amber-500' : ''} />
              </button>
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-lg h-80 sm:h-96 perspective-1000 cursor-pointer select-none group"
          >
            <div
              className={`w-full h-full relative duration-500 transform-style-3d transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front of Card */}
              <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-stone-200/90 rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-card group-hover:border-rose-300 transition-colors">
                <div className="w-full flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Tiếng Pháp
                  </span>
                  <AudioPlayerButton text={currentCard.french} size="md" />
                </div>

                <div className="my-auto space-y-2">
                  <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                    {currentCard.french}
                  </h2>
                  <p className="font-mono text-sm text-rose-600 bg-rose-50 px-3 py-1 rounded-full inline-block font-semibold">
                    {currentCard.phonetic}
                  </p>
                  {currentCard.gender && (
                    <p className="text-xs text-slate-600 font-medium">
                      Giới tính: {currentCard.gender === 'm' ? 'Masculin (Giống đực)' : currentCard.gender === 'f' ? 'Féminin (Giống cái)' : 'Pluriel (Số nhiều)'}
                    </p>
                  )}
                </div>

                <div className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                  <RotateCcw size={13} />
                  <span>Chạm để xem nghĩa tiếng Việt & Ví dụ</span>
                </div>
              </div>

              {/* Back of Card */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                    Nghĩa & Ví dụ thực tế
                  </span>
                  <span className="text-xs text-slate-300">🇫🇷 Parisien</span>
                </div>

                <div className="my-auto space-y-4">
                  <div>
                    <span className="text-xs text-slate-300 uppercase font-bold tracking-wider">
                      Ý nghĩa tiếng Việt:
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-amber-300 mt-1">
                      {currentCard.vietnamese}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-serif italic text-sm text-white">
                        « {currentCard.exampleFrench} »
                      </p>
                      <AudioPlayerButton text={currentCard.exampleFrench} size="sm" />
                    </div>
                    <p className="text-xs text-slate-300">
                      {currentCard.exampleVietnamese}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-300 text-center font-semibold flex items-center justify-center gap-1.5">
                  <RotateCcw size={13} />
                  <span>Chạm để lật lại mặt trước</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: Next / Prev / Mastered */}
          <div className="w-full max-w-lg mt-6 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-white border border-stone-200 text-slate-700 hover:bg-stone-50 active:scale-95 transition-all shadow-2xs cursor-pointer"
              title="Thẻ trước"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleShuffle}
              className="p-3 rounded-2xl bg-white border border-stone-200 text-slate-700 hover:bg-stone-50 active:scale-95 transition-all shadow-2xs cursor-pointer"
              title="Trộn ngẫu nhiên"
            >
              <Shuffle size={18} />
            </button>

            <button
              onClick={handleMastered}
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check size={16} />
              <span>Đã thuộc (+10 XP)</span>
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-blue-700 text-white hover:bg-blue-800 active:scale-95 transition-all shadow-2xs cursor-pointer"
              title="Thẻ tiếp theo"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
