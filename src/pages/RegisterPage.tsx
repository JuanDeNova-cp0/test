import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User as UserIcon, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Target, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegisterPageProps {
  onNavigate: (tab: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1');
  const [dailyGoal, setDailyGoal] = useState<number>(15);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: 'Chưa nhập', color: 'bg-stone-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, text: 'Yếu', color: 'bg-rose-500', width: 'w-1/4' };
    if (score === 2) return { score: 2, text: 'Trung bình', color: 'bg-amber-500', width: 'w-2/4' };
    if (score === 3) return { score: 3, text: 'Khá tốt', color: 'bg-blue-500', width: 'w-3/4' };
    return { score: 4, text: 'Rất mạnh', color: 'bg-emerald-500', width: 'w-full' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu cần tối thiểu 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    if (!agreeTerms) {
      setError('Vui lòng đồng ý với Điều khoản học tập để tiếp tục.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = register({
        name,
        email,
        password,
        level,
        dailyGoal
      });

      setIsLoading(false);

      if (res.success) {
        // Celebrate with confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}

        onNavigate('home');
      } else {
        setError(res.error || 'Đăng ký không thành công.');
      }
    }, 450);
  };

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
        
        {/* Banner Top */}
        <div className="bg-gradient-to-r from-[#172554] via-[#1E3A8A] to-[#BE123C] px-8 py-6 text-white relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-xs text-rose-200 mb-2">
                <Sparkles size={13} />
                <span>Nhận ngay +100 XP Thưởng Khởi Đầu</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                Tạo tài khoản học viên Bonjour Français
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
                Lộ trình cá nhân hóa được thiết kế riêng theo mục tiêu và trình độ của bạn
              </p>
            </div>
            <div className="hidden sm:block text-5xl">🇫🇷</div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-10">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section 1: Thông tin cơ bản */}
            <div>
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <UserIcon size={16} className="text-blue-700" />
                <span>1. Thông tin cá nhân</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Họ và tên của bạn
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ví dụ: Hoàng Anh hoặc Camille"
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Địa chỉ Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tenban@gmail.com"
                      required
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Mật khẩu bảo mật */}
            <div className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mật khẩu bảo vệ
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    required
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                  {password && (
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <div className="w-2/3 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full ${strength.color} ${strength.width} transition-all`}></div>
                      </div>
                      <span className="font-semibold text-slate-600">{strength.text}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Xác nhận lại mật khẩu
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    required
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Trình độ tiếng Pháp hiện tại */}
            <div className="pt-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target size={16} className="text-rose-600" />
                <span>2. Chọn trình độ hiện tại của bạn</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'A1', title: 'A1 Débutant', desc: 'Người mới bắt đầu từ con số 0' },
                  { id: 'A2', title: 'A2 Élémentaire', desc: 'Đã biết chào hỏi & từ vựng cơ bản' },
                  { id: 'B1', title: 'B1 Intermédiaire', desc: 'Giao tiếp hàng ngày, du lịch tự tin' },
                  { id: 'B2', title: 'B2 Avancé', desc: 'Thuyết trình, ngữ pháp & tranh luận' },
                ].map((item) => {
                  const isSelected = level === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLevel(item.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                          : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                          {item.title}
                        </span>
                        {isSelected && <CheckCircle2 size={15} className="text-blue-700" />}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Mục tiêu thời gian mỗi ngày */}
            <div className="pt-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock size={16} className="text-amber-500" />
                <span>3. Mục tiêu luyện tập mỗi ngày</span>
              </h2>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { minutes: 10, label: '10 phút/ngày', tag: 'Thư thái' },
                  { minutes: 15, label: '15 phút/ngày', tag: 'Khuyên dùng' },
                  { minutes: 30, label: '30 phút/ngày', tag: 'Cấp tốc' },
                ].map((goal) => {
                  const isSelected = dailyGoal === goal.minutes;
                  return (
                    <button
                      key={goal.minutes}
                      type="button"
                      onClick={() => setDailyGoal(goal.minutes)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500 shadow-sm'
                          : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-slate-700'
                      }`}
                    >
                      <p className="text-xs font-bold">{goal.label}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-stone-200 text-slate-600">
                        {goal.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1 flex items-start gap-2.5">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 text-blue-700 focus:ring-blue-500 border-stone-300 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer">
                Tôi đồng ý với các <span className="text-blue-700 underline font-semibold">Điều khoản dịch vụ</span> và chính sách bảo mật của Bonjour Français.
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-indigo-700 to-rose-600 hover:opacity-95 shadow-md shadow-blue-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Hoàn tất đăng ký & Bắt đầu học</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 pt-6 border-t border-stone-200 text-center">
            <p className="text-xs text-slate-600">
              Đã có tài khoản từ trước?{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="font-bold text-blue-700 hover:text-blue-900 hover:underline"
              >
                Đăng nhập tại đây
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
