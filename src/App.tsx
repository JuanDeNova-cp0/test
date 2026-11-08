import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { LessonsPage } from './pages/LessonsPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { QuizPage } from './pages/QuizPage';
import { DialoguePage } from './pages/DialoguePage';
import { ProfilePage } from './pages/ProfilePage';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const { isAuthenticated } = useAuth();

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage onNavigate={setCurrentTab} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentTab} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentTab} />;
      case 'lessons':
        return <LessonsPage />;
      case 'flashcards':
        return <FlashcardsPage />;
      case 'quiz':
        return <QuizPage />;
      case 'dialogue':
        return <DialoguePage />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentTab} />;
      default:
        return <HomePage onNavigate={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer onNavigate={setCurrentTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
