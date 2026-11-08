import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  dailyGoal: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  register: (payload: RegisterPayload) => { success: boolean; error?: string };
  logout: () => void;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string, xpReward: number) => void;
  toggleBookmark: (cardId: string) => void;
  loginAsDemo: () => void;
}

const STORAGE_KEY = 'parler_current_user';
const USERS_DB_KEY = 'parler_all_users';

const DEMO_USER: User = {
  id: 'usr-demo-1',
  name: 'Camille Nguyễn',
  email: 'camille@bonjour.fr',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  level: 'A1',
  dailyGoal: 15,
  streakDays: 7,
  xp: 320,
  joinedDate: 'Tháng 10, 2026',
  wordsMastered: 48,
  completedLessons: ['les-1'],
  bookmarkedCards: ['fc-1', 'fc-4', 'fc-8']
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, _password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Vui lòng nhập địa chỉ email.' };
    }

    try {
      const storedUsersRaw = localStorage.getItem(USERS_DB_KEY);
      const storedUsers: User[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      const found = storedUsers.find(u => u.email.toLowerCase() === cleanEmail);

      if (found) {
        setUser(found);
        return { success: true };
      }

      // Check if it's the default demo user
      if (cleanEmail === DEMO_USER.email.toLowerCase()) {
        setUser(DEMO_USER);
        return { success: true };
      }

      // If user doesn't exist yet, we can create a profile for them
      const newUser: User = {
        id: 'usr-' + Date.now(),
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${cleanEmail}`,
        level: 'A1',
        dailyGoal: 15,
        streakDays: 1,
        xp: 50,
        joinedDate: 'Hôm nay',
        wordsMastered: 10,
        completedLessons: [],
        bookmarkedCards: []
      };

      storedUsers.push(newUser);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(storedUsers));
      setUser(newUser);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.' };
    }
  };

  const register = (payload: RegisterPayload) => {
    const cleanEmail = payload.email.trim().toLowerCase();
    if (!cleanEmail || !payload.name) {
      return { success: false, error: 'Vui lòng điền đầy đủ họ tên và email.' };
    }

    try {
      const storedUsersRaw = localStorage.getItem(USERS_DB_KEY);
      const storedUsers: User[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      if (storedUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'Email này đã được đăng ký tài khoản. Vui lòng đăng nhập.' };
      }

      const newUser: User = {
        id: 'usr-' + Date.now(),
        name: payload.name.trim(),
        email: cleanEmail,
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(payload.name)}`,
        level: payload.level || 'A1',
        dailyGoal: payload.dailyGoal || 15,
        streakDays: 1,
        xp: 100, // Welcome bonus XP!
        joinedDate: 'Hôm nay',
        wordsMastered: 12,
        completedLessons: [],
        bookmarkedCards: []
      };

      storedUsers.push(newUser);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(storedUsers));
      setUser(newUser);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Không thể tạo tài khoản lúc này.' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const loginAsDemo = () => {
    setUser(DEMO_USER);
  };

  const addXP = (amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        xp: prev.xp + amount,
        wordsMastered: prev.wordsMastered + 1
      };
    });
  };

  const completeLesson = (lessonId: string, xpReward: number) => {
    setUser(prev => {
      if (!prev) return null;
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        xp: prev.xp + xpReward,
        completedLessons: [...prev.completedLessons, lessonId]
      };
    });
  };

  const toggleBookmark = (cardId: string) => {
    setUser(prev => {
      if (!prev) return null;
      const isBookmarked = prev.bookmarkedCards.includes(cardId);
      return {
        ...prev,
        bookmarkedCards: isBookmarked
          ? prev.bookmarkedCards.filter(id => id !== cardId)
          : [...prev.bookmarkedCards, cardId]
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        addXP,
        completeLesson,
        toggleBookmark,
        loginAsDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
