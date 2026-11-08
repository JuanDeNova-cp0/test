import React, { useState, useEffect } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
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

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function AiTutor() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Xin chào! Tôi là gia sư Lumière AI. Bạn muốn hỏi ngữ pháp, phát âm hay dịch một câu tiếng Pháp?'
    }
  ]);

  const sendMessage = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: prompt }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, messages: messages })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Không thể kết nối với gia sư AI.');
      }
      setMessages((current) => [...current, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: error instanceof Error ? error.message : 'Đã xảy ra lỗi. Vui lòng thử lại.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-[82px] right-4 z-[60] flex items-center gap-2 rounded-full bg-[#172033] px-4 py-3 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-1 md:bottom-6 md:right-6 ${
          open ? 'pointer-events-none scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Mở gia sư AI"
      >
        <Sparkles size={17} className="text-[#D8C4B2]" />
        Hỏi AI
      </button>

      {open && (
        <aside className="fixed bottom-0 right-0 top-auto z-[70] flex h-[min(620px,calc(100%-24px))] w-full flex-col overflow-hidden border border-slate-200 bg-white shadow-2xl sm:bottom-6 sm:right-6 sm:top-auto sm:h-[620px] sm:w-[390px] sm:rounded-[24px] md:rounded-[24px]">
          <header className="flex items-center justify-between border-b border-slate-100 bg-[#172033] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <Bot size={20} className="text-[#E8D5C5]" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold">Gia sư Lumière AI</h2>
                <p className="text-[11px] text-slate-300">Powered by Google Gemini</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Đóng gia sư AI"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[#FAFAF9] p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-[#415991] text-white'
                      : 'rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage();
            }}
            className="border-t border-slate-100 bg-white p-3"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-[#A8B5D4] focus-within:ring-2 focus-within:ring-[#A8B5D4]/20">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Hỏi về passé composé, phát âm…"
                className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-slate-400"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#172033] text-white transition hover:bg-[#415991] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Gửi câu hỏi"
              >
                <Send size={17} />
              </button>
            </div>
          </form>
        </aside>
      )}
    </>
  );
}

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
    <div className="min-h-screen flex flex-col bg-[#FBFAF7]">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer onNavigate={setCurrentTab} />
      <AiTutor />
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
