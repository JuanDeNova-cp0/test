import React, { useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Check,
  CircleHelp,
  Flame,
  Languages,
  LockKeyhole,
  Mic,
  Play,
  Sparkles,
  Volume2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { playFrenchAudio } from '../utils/audio';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

const roadmap = [
  { title: 'Les salutations', meta: 'A1 · Terminé', state: 'done' },
  { title: 'Le présent simple', meta: 'A1 · Terminé', state: 'done' },
  { title: 'Le passé composé', meta: 'A1 · Leçon actuelle', state: 'current' },
  { title: 'Les voyages', meta: 'A2 · À débloquer', state: 'locked' }
] as const;

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user, addXP } = useAuth();
  const [translation, setTranslation] = useState<'fr' | 'vi'>('vi');
  const [saved, setSaved] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [quizChoice, setQuizChoice] = useState<string | null>(null);
  const firstName = user?.name?.split(' ')[0] || 'Alex';
  const isCorrect = quizChoice === 'sommes allés';

  const playWord = () => {
    setAudioPlaying(true);
    playFrenchAudio('éphémère', () => setAudioPlaying(false));
  };

  const toggleRecording = () => {
    setRecording((current) => !current);
  };

  const chooseQuiz = (choice: string) => {
    setQuizChoice(choice);
    if (choice === 'sommes allés') addXP(10);
  };

  return (
    <div className="min-h-full bg-[#FAFAF9] pb-28 md:pb-16">
      <div className="mx-auto max-w-[1480px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Welcome banner */}
        <section className="relative mb-5 overflow-hidden rounded-[28px] bg-[#172033] px-5 py-7 text-white shadow-[0_18px_50px_-20px_rgba(15,23,42,.45)] sm:px-8 sm:py-8 lg:px-10">
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border-[48px] border-white/[0.035]" />
          <div className="absolute bottom-[-110px] right-20 h-52 w-52 rounded-full bg-[#7c8fbd]/10 blur-2xl" />
          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9D3EA]">
                <Sparkles size={14} className="text-[#D5BBA6]" />
                Session du jour
              </div>
              <h1 className="font-serif text-[2rem] font-semibold leading-tight sm:text-4xl">
                Bonjour, {firstName} !
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="font-serif text-lg italic text-[#E4E0DA]">
                  {translation === 'fr'
                    ? 'Petit à petit, l’oiseau fait son nid.'
                    : 'Từng bước nhỏ, chim làm tổ của mình.'}
                </p>
                <button
                  onClick={() => setTranslation((current) => current === 'fr' ? 'vi' : 'fr')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
                  title="Changer la traduction"
                >
                  <Languages size={13} />
                  {translation === 'fr' ? 'Français' : 'Tiếng Việt'}
                </button>
              </div>
            </div>

            <button
              onClick={() => onNavigate('lessons')}
              className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.08] p-3 pr-4 text-left backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12] lg:w-[360px]"
            >
              <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-[#172033]">
                <svg viewBox="0 0 44 44" className="absolute inset-1 -rotate-90">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#BE185D" strokeWidth="4" strokeLinecap="round" strokeDasharray="113" strokeDashoffset="40" />
                </svg>
                <span className="relative text-sm font-extrabold">65%</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#AAB6CD]">Reprendre</p>
                <p className="mt-1 truncate font-serif text-lg font-semibold">Le Passé Composé</p>
                <p className="mt-1 text-xs text-[#C9D3EA]">4 minutes restantes</p>
              </div>
              <ArrowRight size={18} className="shrink-0 text-[#C9D3EA] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Word of the day */}
          <section className="rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-sm transition hover:border-[#C7D2FE] hover:shadow-md sm:p-7 lg:col-span-5 lg:min-h-[330px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A6B52]">Mot du jour</p>
                <p className="mt-1 text-sm text-slate-500">Niveau B1 · Culture</p>
              </div>
              <button
                onClick={() => setSaved((current) => !current)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:-translate-y-0.5 ${
                  saved ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-700'
                }`}
                title="Ajouter au vocabulaire"
              >
                <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-4xl font-semibold text-[#172033] sm:text-5xl">Éphémère</h2>
                  <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">féminin</span>
                </div>
                <p className="mt-2 font-mono text-sm text-slate-500">/e.fe.mɛʁ/ <span className="text-slate-400">· adjectif</span></p>
              </div>
              <button
                onClick={playWord}
                className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full transition ${
                  audioPlaying ? 'bg-[#BE185D] text-white shadow-lg shadow-rose-200' : 'bg-[#F1F4F9] text-[#1E293B] hover:bg-[#E8ECF5]'
                }`}
                title="Écouter"
              >
                {audioPlaying && <span className="absolute inset-0 animate-ping rounded-full border border-rose-300 opacity-50" />}
                <Volume2 size={22} />
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-100 bg-[#F7F7F5] px-4 py-4">
              <p className="font-serif text-lg leading-relaxed text-slate-700">
                La beauté <span className="text-rose-700 underline decoration-rose-200 decoration-2 underline-offset-4">éphémère</span> d’un coucher de soleil parisien.
              </p>
              <p className="mt-2 text-xs text-slate-500">Vẻ đẹp thoáng qua của hoàng hôn Paris.</p>
            </div>
          </section>

          {/* Roadmap */}
          <section className="rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-sm transition hover:border-[#C7D2FE] hover:shadow-md sm:p-7 lg:col-span-4 lg:min-h-[330px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#435A8E]">Le sentier</p>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#172033]">Votre parcours</h2>
              </div>
              <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-bold text-[#415991]">A1 · 68%</span>
            </div>

            <div className="relative mt-6 space-y-0">
              {roadmap.map((step, index) => (
                <button
                  key={step.title}
                  onClick={() => step.state !== 'locked' && onNavigate('lessons')}
                  className="group relative flex w-full items-start gap-3 pb-5 text-left"
                >
                  {index < roadmap.length - 1 && (
                    <span className={`absolute left-[19px] top-10 h-[calc(100%-32px)] w-px ${step.state === 'done' ? 'bg-[#A3B2D8]' : 'bg-slate-200'}`} />
                  )}
                  <span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 ${
                    step.state === 'done' ? 'border-[#9AA9CD] bg-[#EEF2FF] text-[#415991]' :
                    step.state === 'current' ? 'border-[#BE185D] bg-[#BE185D] text-white shadow-[0_0_0_7px_rgba(190,24,93,.10)]' :
                    'border-slate-200 bg-slate-50 text-slate-400'
                  }`}>
                    {step.state === 'done' ? <Check size={17} /> : step.state === 'locked' ? <LockKeyhole size={15} /> : <Play size={15} fill="currentColor" />}
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className={`block font-semibold transition ${step.state === 'locked' ? 'text-slate-400' : 'text-slate-800 group-hover:text-[#415991]'}`}>{step.title}</span>
                    <span className={`mt-1 block text-xs ${step.state === 'current' ? 'font-bold text-[#BE185D]' : 'text-slate-500'}`}>{step.meta}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Pronunciation studio */}
          <section className="relative overflow-hidden rounded-[24px] border border-slate-200/70 bg-[#EEF2FF] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-7 lg:col-span-3 lg:min-h-[330px]">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/70 blur-2xl" />
            <div className="relative">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#526899]">Atelier oral</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-[#172033]">Le son /ʁ/</h2>
              <div className="mt-6 rounded-2xl border border-white/80 bg-white/75 px-4 py-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Précision</span>
                  <span className="font-serif text-2xl font-bold text-[#415991]">94%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#687DAE] to-[#2E4D82]" />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={playWord}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-xs font-bold text-[#415991] shadow-sm transition hover:-translate-y-0.5"
                >
                  <Volume2 size={16} />
                  Modèle
                </button>
                <button
                  onClick={toggleRecording}
                  className={`relative grid h-16 w-16 place-items-center rounded-full text-white shadow-lg transition hover:scale-[1.03] ${
                    recording ? 'bg-rose-600 shadow-rose-200' : 'bg-[#172033] shadow-slate-300'
                  }`}
                  title={recording ? 'Arrêter l’enregistrement' : 'Commencer l’enregistrement'}
                >
                  {recording && <span className="absolute inset-0 animate-ping rounded-full bg-rose-400 opacity-30" />}
                  <Mic size={23} className="relative" />
                </button>
              </div>
              <p className="mt-4 text-center text-xs font-semibold text-[#526899]">
                {recording ? 'J’écoute votre prononciation…' : 'Touchez pour enregistrer'}
              </p>
            </div>
          </section>

          {/* Conjugation quiz */}
          <section className="rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-sm transition hover:border-[#D8B4C7] hover:shadow-md sm:p-7 lg:col-span-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A6B52]">Quiz express · 30 sec</p>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#172033]">Complétez la phrase</h2>
              </div>
              <button className="rounded-full border border-slate-200 p-2 text-slate-400 transition hover:border-slate-300 hover:text-slate-700" title="Conseil">
                <CircleHelp size={17} />
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-[#F7F7F5] px-4 py-5 text-center sm:px-6">
              <p className="font-serif text-xl text-slate-800 sm:text-2xl">
                Hier, nous <span className="inline-block min-w-20 border-b-2 border-dashed border-[#BE185D] px-2 pb-1 font-bold text-[#BE185D]">
                  {quizChoice || '___'}
                </span> au musée.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {['avons été', 'ai été', 'sommes allés', 'êtes allés'].map((choice) => {
                const selected = quizChoice === choice;
                const correct = choice === 'sommes allés';
                return (
                  <button
                    key={choice}
                    onClick={() => chooseQuiz(choice)}
                    className={`rounded-xl border px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${
                      selected && (choice === 'sommes allés')
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                        : selected && !correct
                          ? 'border-rose-200 bg-rose-50 text-rose-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-[#A8B5D4] hover:text-[#415991]'
                    }`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            {quizChoice && (
              <p className={`mt-4 text-center text-sm font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isCorrect ? 'Très bien ! « Nous sommes allés » — +10 XP' : 'Presque ! Pour « nous », on dit « sommes allés ».'}
              </p>
            )}
          </section>

          {/* Daily goal */}
          <section className="rounded-[24px] border border-slate-200/70 bg-[#F7F4EF] p-5 shadow-sm lg:col-span-5">
            <div className="flex h-full items-center justify-between gap-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A6B52]">Objectif quotidien</p>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-[#172033]">11 / 15 minutes</h2>
                <p className="mt-2 text-sm text-slate-500">Encore 4 minutes pour conserver votre série.</p>
              </div>
              <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full bg-white shadow-sm">
                <svg viewBox="0 0 44 44" className="absolute h-20 w-20 -rotate-90">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#E7E5E4" strokeWidth="4" />
                  <circle cx="22" cy="22" r="18" fill="none" stroke="#C2410C" strokeWidth="4" strokeLinecap="round" strokeDasharray="113" strokeDashoffset="30" />
                </svg>
                <Flame size={28} className="relative fill-[#C2410C] text-[#C2410C]" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
