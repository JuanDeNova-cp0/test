import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Flame, Sparkles, BookOpen, Layers, HelpCircle, MessageSquare, LogIn, UserPlus, LogOut, Menu, X, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'lessons', label: 'Parcours', icon: BookOpen },
    { id: 'dialogue', label: 'Atelier Oral', icon: MessageSquare },
    { id: 'lessons', label: 'Grammaire', icon: HelpCircle },
    { id: 'flashcards', label: 'Communauté', icon: Layers },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* French Tricolor Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#002654] via-white to-[#ED2939] shadow-sm"></div>

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-200/70 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Brand Logo */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-[#173a8a] via-[#293b86] to-[#d44b62] flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg shadow-blue-900/15 group-hover:scale-105 transition-transform">
                🥐
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                Lumière <span className="text-rose-600 italic">French</span>
                </span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-slate-600">
                  Học tiếng Pháp thông minh
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={`${item.id}-${item.label}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-stone-100/80'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-blue-700' : 'text-slate-600'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Auth / Profile Area */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  {/* Streak pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/80 text-amber-700 rounded-full text-xs font-bold shadow-xs">
                    <Flame size={15} className="text-amber-500 fill-amber-500 animate-bounce" />
                    <span>{user.streakDays} ngày</span>
                  </div>

                  {/* XP pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200/80 text-indigo-700 rounded-full text-xs font-bold shadow-xs">
                    <Sparkles size={14} className="text-indigo-600" />
                    <span>{user.xp} XP</span>
                  </div>

                  {/* Profile Dropdown trigger */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-full hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-rose-400"
                      />
                    </button>

                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3 py-2.5 border-b border-stone-100">
                          <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                          <p className="text-xs text-slate-600 truncate">{user.email}</p>
                          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700">
                            Trình độ: {user.level} (Débutant)
                          </div>
                        </div>

                        <div className="py-1">
                          <button
                            onClick={() => {
                              setCurrentTab('profile');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-50 rounded-xl transition-colors"
                          >
                            <UserIcon size={15} className="text-slate-600" />
                            <span>Hồ sơ & Tiến độ học tập</span>
                          </button>
                        </div>

                        <div className="pt-1 border-t border-stone-100">
                          <button
                            onClick={() => {
                              logout();
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                          >
                            <LogOut size={15} />
                            <span>Đăng xuất</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setCurrentTab('login')}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors"
                  >
                    <LogIn size={16} />
                    <span>Đăng nhập</span>
                  </button>
                  <button
                    onClick={() => setCurrentTab('register')}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 rounded-xl shadow-sm hover:shadow transition-all"
                  >
                    <UserPlus size={16} />
                    <span>Đăng ký miễn phí</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-stone-100"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive ? 'bg-blue-50 text-blue-900' : 'text-slate-700 hover:bg-stone-50'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-blue-700' : 'text-slate-600'} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-3 border-t border-stone-200">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-xs font-semibold text-slate-600">Xin chào, {user.name}</span>
                    <span className="text-xs font-bold text-amber-600">🔥 {user.streakDays} ngày</span>
                  </div>
                  <button
                    onClick={() => handleNavClick('profile')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-stone-50 rounded-xl"
                  >
                    <UserIcon size={16} />
                    <span>Hồ sơ học viên</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-stone-100 rounded-xl"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => handleNavClick('register')}
                    className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-700 rounded-xl"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/80 bg-white/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4">
          {[
            { id: 'home', label: 'Accueil', icon: Sparkles },
            { id: 'lessons', label: 'Parcours', icon: BookOpen },
            { id: 'dialogue', label: 'Oral', icon: MessageSquare },
            { id: 'profile', label: 'Profil', icon: UserIcon }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center gap-1 rounded-xl py-1 text-[10px] font-bold transition ${
                  isActive ? 'text-[#415991]' : 'text-slate-400'
                }`}
              >
                <Icon size={19} fill={isActive ? 'currentColor' : 'none'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
