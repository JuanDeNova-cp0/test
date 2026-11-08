import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-stone-200/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-100">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🥐</span>
              <span className="font-serif text-xl font-bold text-slate-900">
                Bonjour <span className="text-rose-600 italic">Français</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nền tảng học tiếng Pháp tương tác trực quan, rèn luyện phản xạ phát âm chuẩn Parisienne và làm chủ ngữ pháp Châu Âu.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Chương trình học
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => onNavigate('lessons')} className="hover:text-blue-700 transition-colors">A1 - Nhập môn vỡ lòng</button></li>
              <li><button onClick={() => onNavigate('lessons')} className="hover:text-blue-700 transition-colors">A2 - Giao tiếp cơ bản</button></li>
              <li><button onClick={() => onNavigate('lessons')} className="hover:text-blue-700 transition-colors">B1 - Du lịch & Cuộc sống</button></li>
              <li><button onClick={() => onNavigate('lessons')} className="hover:text-blue-700 transition-colors">B2 - Tranh luận học thuật</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Công cụ tương tác
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => onNavigate('flashcards')} className="hover:text-rose-600 transition-colors">Flashcards 3D thông minh</button></li>
              <li><button onClick={() => onNavigate('dialogue')} className="hover:text-rose-600 transition-colors">Hội thoại Café de Flore</button></li>
              <li><button onClick={() => onNavigate('quiz')} className="hover:text-rose-600 transition-colors">Đố vui & Đề thi trắc nghiệm</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Tài khoản
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => onNavigate('login')} className="hover:text-blue-700 transition-colors">Đăng nhập tài khoản</button></li>
              <li><button onClick={() => onNavigate('register')} className="hover:text-blue-700 transition-colors">Đăng ký thành viên mới</button></li>
              <li><button onClick={() => onNavigate('profile')} className="hover:text-blue-700 transition-colors">Hồ sơ & Huy hiệu đạt được</button></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>© 2026 Bonjour Français. Conçu avec passion pour la langue française 🇫🇷</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế tinh tế & chuẩn mực</span>
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span>cho học viên Việt Nam</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
