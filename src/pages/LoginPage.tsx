import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (tab: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, loginAsDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }

    if (!password) {
      setError('Vui lòng nhập mật khẩu.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        onNavigate('home');
      } else {
        setError(res.error || 'Đăng nhập không thành công.');
      }
    }, 400);
  };

  const handleQuickDemo = () => {
    loginAsDemo();
    onNavigate('home');
  };

  return (
    <div className="min-h-[calc(100vh-84px)] bg-[#FAF8F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
        
        {/* Left Side: Editorial / Brand Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0F1E36] via-[#1E3A8A] to-[#2563EB] p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Background Circles */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-rose-200 border border-white/10 mb-8">
              <span>🇫🇷</span>
              <span>L’art d’apprendre le français</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Khám phá vẻ đẹp ngôn ngữ Pháp
            </h2>
            <p className="text-blue-100/80 text-sm leading-relaxed mb-8">
              Đăng nhập để tiếp tục hành trình làm chủ tiếng Pháp với phương pháp phản xạ âm thanh, flashcard tương tác và các đoạn hội thoại đời thực tại Paris.
            </p>

            <div className="space-y-3.5 border-t border-white/15 pt-6 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="text-blue-50">Lộ trình CEFR từ A1 đến B2 tinh giản</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="text-blue-50">Luyện phát âm chuẩn giọng bản xứ Paris</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                <span className="text-blue-50">Lưu lại từ vựng & duy trì chuỗi Streak mỗi ngày</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 pt-6 border-t border-white/10">
            <p className="font-serif italic text-xs text-blue-200">
              « Petit à petit, l'oiseau fait son nid. »
            </p>
            <p className="text-[11px] text-blue-300/80 mt-1">
              (Kiến tha lâu cũng đầy tổ — Từng bước một để thành công)
            </p>
          </div>
        </div>

        {/* Right Side: Detailed Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            {/* Form Header */}
            <div className="mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-rose-600">
                Chào mừng bạn trở lại
              </span>
              <h1 className="font-serif text-3xl font-bold text-slate-900 mt-1">
                Đăng nhập tài khoản
              </h1>
              <p className="text-sm text-slate-600 mt-1.5">
                Nhập thông tin của bạn để tiếp tục bài học dang dở
              </p>
            </div>

            {/* Quick Demo Login Pill */}
            <div className="mb-6 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-900">Trải nghiệm nhanh không cần gõ?</p>
                  <p className="text-[11px] text-amber-700">Tài khoản học viên mẫu Camille (A1)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="px-3 py-1.5 bg-white text-amber-900 text-xs font-bold rounded-xl border border-amber-300 hover:bg-amber-100/50 shadow-2xs transition-colors shrink-0"
              >
                Vào nhanh
              </button>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Địa chỉ Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ví dụ: camille@bonjour.fr"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Mật khẩu
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Chức năng khôi phục mật khẩu: Bạn có thể nhập bất kỳ mật khẩu nào để thử nghiệm hoặc dùng nút Đăng nhập nhanh bên trên.')}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-11 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-600 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-700 focus:ring-blue-500 border-stone-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs font-medium text-slate-700 cursor-pointer">
                  Ghi nhớ đăng nhập trên thiết bị này
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 shadow-md shadow-blue-900/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Đăng nhập ngay</span>
                    <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Social logins */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-600 font-semibold">
                    Hoặc đăng nhập với
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-stone-50 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-stone-50 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 0.6-2.65 1.35-.58.66-1.09 1.73-0.95 2.76.99.08 2.04-.51 2.67-1.26z"/>
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>
            </div>

            {/* Switch to Register */}
            <p className="mt-8 text-center text-xs text-slate-600">
              Bạn chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="font-bold text-rose-600 hover:text-rose-700 hover:underline"
              >
                Đăng ký thành viên mới
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
