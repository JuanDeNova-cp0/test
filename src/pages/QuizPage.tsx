import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/frenchData';
import { useAuth } from '../context/AuthContext';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  Flame 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizPage: React.FC = () => {
  const { addXP } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
      addXP(currentQ.xp);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
          <HelpCircle size={14} />
          <span>Thử thách phản xạ ngôn ngữ</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Đố Vui & Luyện Đề Tiếng Pháp
        </h1>
        <p className="text-sm text-slate-600">
          Kiểm tra độ nhạy bén với từ vựng, ngữ pháp và ngữ cảnh giao tiếp thực tế
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-6 sm:p-8 space-y-6">
          
          {/* Progress bar & XP indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span>
              Câu hỏi {currentIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
              <Sparkles size={14} />
              <span>+{currentQ.xp} XP khi trả lời đúng</span>
            </div>
          </div>

          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-700 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>

            {currentQ.frenchPrompt && (
              <div className="flex items-center gap-2 pt-1">
                <span className="font-serif italic text-xs text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg font-medium">
                  « {currentQ.frenchPrompt} »
                </span>
                <AudioPlayerButton text={currentQ.frenchPrompt} size="sm" />
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctAnswer;

              let style = 'border-stone-200 hover:border-blue-400 hover:bg-stone-50 text-slate-800';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isSelected) {
                  style = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                } else {
                  style = 'border-stone-200 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect && <CheckCircle2 size={20} className="text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle size={20} className="text-rose-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 space-y-1 animate-in fade-in duration-200">
              <p className="font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                💡 Giải thích chi tiết:
              </p>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="py-3 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-900/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'Xem kết quả' : 'Câu tiếp theo'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-4xl shadow-inner">
            🏆
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-rose-600">
              Félicitations ! Xuất sắc !
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Bạn đã hoàn thành thử thách!
            </h2>
            <p className="text-sm text-slate-600">
              Bạn đã trả lời đúng <strong className="text-slate-900">{score} / {QUIZ_QUESTIONS.length}</strong> câu hỏi.
            </p>
          </div>

          {/* Score pill */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-stone-50 border border-stone-200">
            <div>
              <p className="text-xs text-slate-600 font-semibold">Tỉ lệ chính xác</p>
              <p className="text-2xl font-serif font-bold text-blue-900">
                {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%
              </p>
            </div>
            <div className="w-px h-8 bg-stone-200"></div>
            <div>
              <p className="text-xs text-slate-600 font-semibold">XP Nhận được</p>
              <p className="text-2xl font-serif font-bold text-indigo-700">
                +{score * 20} XP
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-900/20 active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Thử làm lại bài đố</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
