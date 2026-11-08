import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MOT_DU_JOUR } from '../data/frenchData';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  ArrowRight, 
  Flame, 
  Award, 
  Compass, 
  CheckCircle2, 
  Coffee, 
  Headphones 
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] to-white border-b border-stone-200/60 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-rose-700 text-xs font-bold shadow-2xs">
              <span className="text-base">🇫🇷</span>
              <span>Khởi đầu hành trình tiếng Pháp chuẩn CEFR</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Học tiếng Pháp tự nhiên & thanh lịch như một <span className="text-rose-600 italic">Parisien</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Chinh phục phát âm chuẩn xác, làm chủ ngữ pháp tinh tế và tự tin giao tiếp qua các bài học tình huống thực tế, bộ thẻ Flashcard thông minh cùng hội thoại đời thường tại Paris.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('lessons')}
                className="px-6 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <BookOpen size={18} />
                <span>Bắt đầu bài học ngay</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigate('flashcards')}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-slate-800 font-bold text-sm border border-stone-300 shadow-2xs active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Layers size={18} className="text-rose-600" />
                <span>Luyện thẻ Flashcards</span>
              </button>
            </div>

            {/* Quick stats ribbon */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200/70 max-w-lg">
              <div>
                <p className="font-serif text-2xl font-bold text-slate-900">1,500+</p>
                <p className="text-xs text-slate-600 font-medium">Từ vựng & Mẫu câu</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-slate-900">A1 - B2</p>
                <p className="text-xs text-slate-600 font-medium">Khung chuẩn Châu Âu</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-slate-900">100%</p>
                <p className="text-xs text-slate-600 font-medium">Phát âm giọng Paris</p>
              </div>
            </div>
          </div>

          {/* Right Banner Showcase: Mot du Jour + Quick widget */}
          <div className="lg:col-span-5 space-y-5">
            {/* Mot du Jour (Word of the Day Card) */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200/90 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/60 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900">
                  ✨ Mot du jour • Từ vựng hôm nay
                </span>
                <span className="text-xs font-semibold text-slate-600">Trình độ B1</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-3xl font-bold text-slate-900">
                    {MOT_DU_JOUR.french}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                    <span className="font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md font-medium">
                      {MOT_DU_JOUR.phonetic}
                    </span>
                    <span>• {MOT_DU_JOUR.gender}</span>
                  </div>
                </div>

                <AudioPlayerButton text={MOT_DU_JOUR.french} size="lg" />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800">
                {MOT_DU_JOUR.vietnamese}
              </p>

              <div className="mt-4 p-3.5 bg-stone-50 rounded-2xl border border-stone-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-serif italic font-medium text-slate-800">
                    « {MOT_DU_JOUR.exampleFrench} »
                  </p>
                  <AudioPlayerButton text={MOT_DU_JOUR.exampleFrench} size="sm" />
                </div>
                <p className="text-slate-600">
                  {MOT_DU_JOUR.exampleVietnamese}
                </p>
              </div>
            </div>

            {/* Quick Continue Card */}
            {isAuthenticated && user && (
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-white/60 object-cover"
                    />
                    <div>
                      <p className="text-xs text-blue-200">Chào mừng trở lại,</p>
                      <p className="font-bold text-base">{user.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-amber-300 font-bold flex items-center gap-1 justify-end">
                      <Flame size={14} className="fill-amber-300" />
                      {user.streakDays} ngày liên tiếp
                    </p>
                    <p className="text-xs text-blue-200">{user.xp} XP tích lũy</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-blue-200 uppercase font-semibold">Bài học đề xuất</p>
                    <p className="text-xs font-bold text-white">1. Nhập môn & Chào hỏi chuẩn Paris</p>
                  </div>
                  <button
                    onClick={() => onNavigate('lessons')}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-blue-950 font-bold text-xs hover:bg-blue-50 transition-colors"
                  >
                    Học tiếp
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Main Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-3xl font-bold text-slate-900">
            Học toàn diện 4 kỹ năng tiếng Pháp
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Phương pháp học tập hiện đại kết hợp lý thuyết tinh gọn và thực hành tương tác ngay lập tức
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => onNavigate('lessons')}
            className="group bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Khóa học & Ngữ pháp
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Các bài học ngắn gọn từ A1 đến B2, phân tích cấu trúc câu và mẹo nhớ chia động từ bất quy tắc.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-blue-700 gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Xem giáo trình</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onNavigate('flashcards')}
            className="group bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                🃏
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                Flashcards 3D thông minh
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Lật thẻ lặp lại ngắt quãng (Spaced Repetition), nghe âm thanh chuẩn từng từ và ví dụ thực tế.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-rose-600 gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Luyện 10 thẻ ngay</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onNavigate('quiz')}
            className="group bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                Đố vui & Thi thử
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Kiểm tra kiến thức với các câu hỏi trắc nghiệm thực tế, giải thích chi tiết và nhận điểm kinh nghiệm XP.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-amber-700 gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Bắt đầu thi thử</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => onNavigate('dialogue')}
            className="group bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                ☕
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Hội thoại Đời sống Paris
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Thực hành các kịch bản thực tế: Gọi món tại quán cà phê, hỏi đường tới bảo tàng, mua sắm bánh mì.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-emerald-700 gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Vào kịch bản</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Motivational Quote Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-stone-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-3xl">🥖 🗼 🍷</span>
            <p className="font-serif text-2xl sm:text-3xl italic font-semibold leading-relaxed text-blue-100">
              « Une langue différente est une vision différente de la vie. »
            </p>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              — Federico Fellini (Một ngôn ngữ mới là một thế giới quan mới về cuộc đời)
            </p>
            <div className="pt-4">
              <button
                onClick={() => onNavigate(isAuthenticated ? 'lessons' : 'register')}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-900/40 transition-all cursor-pointer"
              >
                {isAuthenticated ? 'Vào học ngay hôm nay' : 'Đăng ký tài khoản miễn phí'}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
