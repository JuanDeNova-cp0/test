import React, { useState } from 'react';
import { LESSONS_DATA } from '../data/frenchData';
import { Lesson } from '../types';
import { useAuth } from '../context/AuthContext';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  X, 
  Award, 
  ArrowRight, 
  Filter 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LessonsPage: React.FC = () => {
  const { user, completeLesson } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const filteredLessons = selectedLevel === 'ALL'
    ? LESSONS_DATA
    : LESSONS_DATA.filter(l => l.level === selectedLevel);

  const handleComplete = (lesson: Lesson) => {
    completeLesson(lesson.id, lesson.xpReward);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
    setActiveLesson(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-2">
            <BookOpen size={14} />
            <span>Giáo trình chuẩn Châu Âu CEFR</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Khóa học Tiếng Pháp Tương tác
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Chọn trình độ phù hợp và hoàn thành các bài học để nhận điểm kinh nghiệm (XP)
          </p>
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl shrink-0 overflow-x-auto">
          {['ALL', 'A1', 'A2', 'B1', 'B2'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl === 'ALL' ? 'Tất cả' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const isCompleted = user?.completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className="group bg-white rounded-3xl border border-stone-200/80 p-6 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>Đã hoàn thành</span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {lesson.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      Cấp độ {lesson.level}
                    </span>
                    <span className="ml-2 text-xs text-slate-600 font-medium">{lesson.category}</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                  {lesson.title}
                </h3>
                <p className="font-serif italic text-xs text-rose-600 mt-0.5">
                  {lesson.subTitle}
                </p>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {lesson.description}
                </p>

                {/* Topics Tag List */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {lesson.topics.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-stone-50 border border-stone-100 text-slate-600 px-2 py-0.5 rounded-lg"
                    >
                      • {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {lesson.duration}
                  </span>
                  <span className="flex items-center gap-1 text-indigo-700 font-bold">
                    <Sparkles size={13} />
                    +{lesson.xpReward} XP
                  </span>
                </div>

                <span className="text-blue-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Học bài
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Detail Interactive Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeLesson.icon}</span>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    Trình độ {activeLesson.level}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5">
                    {activeLesson.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="p-2 rounded-full hover:bg-stone-100 text-slate-600 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm">
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
                <p className="text-xs uppercase font-bold text-blue-900 tracking-wider">Mục tiêu bài học</p>
                <p className="text-slate-700 mt-1">{activeLesson.description}</p>
              </div>

              {/* Sample Dialog / Vocabulary section */}
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-3">
                  Từ vựng & Mẫu câu trọng tâm
                </h4>
                <div className="space-y-3">
                  {[
                    { fr: 'Bonjour ! Comment vous appelez-vous ?', vi: 'Xin chào! Bạn tên là gì ạ?' },
                    { fr: 'Je m’appelle Alexandre, et vous ?', vi: 'Tôi tên là Alexandre, còn bạn?' },
                    { fr: 'Enchanté de faire votre connaissance.', vi: 'Rất hân hạnh được làm quen với bạn.' },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{row.fr}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{row.vi}</p>
                      </div>
                      <AudioPlayerButton text={row.fr} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Grammar Tips */}
              <div>
                <h4 className="font-serif text-base font-bold text-slate-900 mb-2">
                  Ghi chú ngữ pháp & Phát âm chuẩn
                </h4>
                <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 text-xs text-amber-950 space-y-2">
                  <p>
                    💡 <strong>Nối âm (Liaison):</strong> Khi từ đằng trước kết thúc bằng phụ âm và từ đằng sau bắt đầu bằng nguyên âm (a, e, i, o, u, y) hoặc âm H câm, người Pháp sẽ nối âm lại với nhau để tạo cảm giác uyển chuyển lãng mạn.
                  </p>
                  <p>
                    💡 <strong>Tu vs Vous:</strong> Dùng <em>« Tu »</em> với bạn bè, đồng trang lứa. Dùng <em>« Vous »</em> khi giao tiếp trang trọng, lịch sự hoặc với người lạ.
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-xs">
                  <Sparkles size={16} />
                  <span>Phần thưởng hoàn thành: +{activeLesson.xpReward} XP</span>
                </div>

                <button
                  onClick={() => handleComplete(activeLesson)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-bold text-xs hover:opacity-95 shadow-md shadow-blue-900/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  <span>Đã học xong & Nhận XP</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
