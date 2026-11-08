import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User as UserIcon, 
  Flame, 
  Sparkles, 
  Award, 
  BookOpen, 
  Layers, 
  Clock, 
  Calendar, 
  LogOut, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (tab: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
        <p className="text-slate-600">Bạn chưa đăng nhập vào hệ thống.</p>
        <button
          onClick={() => onNavigate('login')}
          className="px-6 py-2.5 rounded-xl bg-blue-700 text-white font-bold text-xs"
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  const badges = [
    { name: 'Khởi đầu rực rỡ', icon: '🥐', desc: 'Gia nhập Bonjour Français', unlocked: true },
    { name: 'Chuỗi lửa nhiệt huyết', icon: '🔥', desc: 'Duy trì học 7 ngày liên tục', unlocked: user.streakDays >= 7 },
    { name: 'Chuyên gia Café', icon: '☕', desc: 'Hoàn thành bài gọi món tại Paris', unlocked: true },
    { name: 'Nhà leo tháp Eiffel', icon: '🗼', desc: 'Tích lũy trên 300 điểm XP', unlocked: user.xp >= 300 },
    { name: 'Bậc thầy từ vựng', icon: '📖', desc: 'Thuộc trên 50 thẻ từ vựng', unlocked: user.wordsMastered >= 40 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-32 bg-gradient-to-l from-blue-100/50 via-rose-100/30 to-transparent pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-rose-100 shadow-md"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                {user.name}
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 w-fit mx-auto sm:mx-0">
                Trình độ {user.level} (Débutant)
              </span>
            </div>

            <p className="text-xs text-slate-600">{user.email}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-600" />
                <span>Gia nhập: {user.joinedDate}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-500" />
                <span>Mục tiêu: {user.dailyGoal} phút/ngày</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              onNavigate('login');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer self-center sm:self-start"
          >
            <LogOut size={15} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl shrink-0">
            🔥
          </div>
          <div>
            <p className="text-xs font-bold text-slate-600">Chuỗi học tập</p>
            <p className="font-serif text-2xl font-bold text-slate-900">{user.streakDays} ngày</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0">
            ⚡
          </div>
          <div>
            <p className="text-xs font-bold text-slate-600">Điểm kinh nghiệm</p>
            <p className="font-serif text-2xl font-bold text-slate-900">{user.xp} XP</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
            📚
          </div>
          <div>
            <p className="text-xs font-bold text-slate-600">Từ đã thuộc</p>
            <p className="font-serif text-2xl font-bold text-slate-900">{user.wordsMastered} từ</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">
            🎓
          </div>
          <div>
            <p className="text-xs font-bold text-slate-600">Bài học xong</p>
            <p className="font-serif text-2xl font-bold text-slate-900">{user.completedLessons.length} bài</p>
          </div>
        </div>
      </div>

      {/* Badges Collection */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xl space-y-6">
        <div>
          <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award size={20} className="text-amber-500" />
            <span>Huy hiệu danh giá (Badges d’honneur)</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Mở khóa huy hiệu khi đạt các mốc học tập và duy trì phản xạ tiếng Pháp
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all ${
                b.unlocked
                  ? 'border-amber-200 bg-amber-50/40'
                  : 'border-stone-200 bg-stone-50 opacity-50 grayscale'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-2xl shrink-0">
                {b.icon}
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900">{b.name}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
