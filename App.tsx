
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Pitch } from './components/Pitch';
import { Player, InteractionMode, Drawing, Position, Ball, Note, Formation, CurveArrow, Path, MarkerShape, Arrow } from './types';
import { generatePlayers, FORMATIONS, TACTICAL_INSIGHTS, FORMATION_COUNTERS } from './constants';
import { LogoIcon, MoveIcon, ArrowIcon, DrawIcon, PlayIcon, ResetIcon, HomeIcon, EraserIcon, CurveIcon, PathIcon, ChevronDownIcon, TextIcon, TrashIcon, CloseIcon, CheckIcon, ChevronRightIcon, ShirtIcon, ChevronLeftIcon, ZapIcon, ShieldIcon, UndoIcon, RewindIcon, MarkerIcon, VectorIcon, LockIcon, UnlockIcon, RotateIcon } from './components/Icons';
import { InfoPages } from './components/InfoPages';
import { LandingPage, translations } from './components/LandingPage';
import { ToolInstruction } from './components/ToolInstruction';

// Professional easing for responsive, dynamic movement
const easeInOutCubic = (t: number): number => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const MotionTransition: React.FC<{ targetBoard?: 1 | 2; label?: string; isInitial?: boolean; isExit?: boolean }> = ({ 
    targetBoard, 
    label = "Tactical Engine Booting", 
    isInitial = false,
    isExit = false
}) => {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden">
            {/* High-Fidelity Background Layer */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className={`absolute inset-0 transition-colors duration-1000 ${isExit ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]'}`} />
                <div className="absolute inset-0" style={{ 
                    backgroundImage: 'linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                }} />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent animate-[scanline_2.5s_ease-in-out_infinite]" />
            </div>

            {/* Central Professional Motion Graphic */}
            <div className="relative flex flex-col items-center gap-12 sm:gap-20 scale-75 sm:scale-100">
                
                {/* 3D-ish Dual Board Hub */}
                <div className="relative w-72 h-48 sm:w-96 sm:h-64 perspective-1000">
                    
                    {/* Board 01 Graphic */}
                    <div className={`absolute top-0 left-2 sm:left-4 w-36 h-24 sm:w-48 sm:h-32 rounded-xl border-2 transition-all duration-1000 transform-gpu ${
                        (targetBoard === 1 || isInitial || isExit) 
                        ? 'border-brand-accent bg-brand-accent/10 translate-z-10 scale-110 shadow-[0_0_40px_rgba(251,191,36,0.3)] opacity-100' 
                        : 'border-white/10 bg-white/5 -rotate-y-20 opacity-40'
                    }`}>
                        <div className="absolute inset-2 border border-dashed border-white/20 rounded-lg flex items-center justify-center">
                            <span className="text-[8px] sm:text-[10px] font-black text-white/40 tracking-tighter uppercase">Board 01</span>
                        </div>
                        {(targetBoard === 1 || isInitial) && !isExit && (
                            <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 bg-brand-accent rounded-full animate-ping" />
                        )}
                    </div>

                    {/* Board 02 Graphic */}
                    <div className={`absolute bottom-0 right-2 sm:right-4 w-36 h-24 sm:w-48 sm:h-32 rounded-xl border-2 transition-all duration-1000 transform-gpu ${
                        (targetBoard === 2 || isInitial || isExit)
                        ? 'border-blue-400 bg-blue-400/10 translate-z-20 scale-110 shadow-[0_0_40px_rgba(56,189,248,0.3)] opacity-100' 
                        : 'border-white/10 bg-white/5 rotate-y-20 opacity-40'
                    }`}>
                         <div className="absolute inset-2 border border-dashed border-white/20 rounded-lg flex items-center justify-center">
                            <span className="text-[8px] sm:text-[10px] font-black text-white/40 tracking-tighter uppercase">Board 02</span>
                        </div>
                        {(targetBoard === 2 || isInitial) && !isExit && (
                            <div className="absolute -top-1 -right-1 w-2 sm:w-3 h-2 sm:h-3 bg-blue-400 rounded-full animate-ping" />
                        )}
                    </div>

                    {/* Central Sync Core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-[#020617] border border-white/20 rounded-2xl flex items-center justify-center z-50 shadow-2xl">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-1000 ${isExit ? 'text-blue-400' : 'text-brand-accent'} animate-[pulse_1.5s_infinite]`}>
                            <LogoIcon />
                        </div>
                        {/* Connecting Data Streams */}
                        <svg className="absolute inset-[-60px] sm:inset-[-100px] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] pointer-events-none opacity-30">
                            <path d="M 100,100 L 20,20" stroke="white" strokeWidth="0.5" strokeDasharray="4,4" className="animate-[dash_2s_linear_infinite]" />
                            <path d="M 100,100 L 180,180" stroke="white" strokeWidth="0.5" strokeDasharray="4,4" className="animate-[dash_2s_linear_infinite_reverse]" />
                        </svg>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="space-y-4 sm:space-y-6 text-center z-10 w-64 sm:w-80">
                    <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${isExit ? 'bg-blue-400' : 'bg-brand-accent'}`} />
                            <h2 className="text-white font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[8px] sm:text-xs">{label}</h2>
                        </div>
                        {isExit ? (
                            <p className="text-slate-400 text-[8px] sm:text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-1000">
                                Thank you for your visit, Coach.
                            </p>
                        ) : (
                            <p className="text-slate-500 text-[7px] sm:text-[9px] font-bold uppercase tracking-widest animate-pulse">Processing Tactical Node Layer...</p>
                        )}
                    </div>
                    
                    <div className="relative h-0.5 bg-white/5 rounded-full overflow-hidden w-full border border-white/5">
                        <div className={`absolute inset-y-0 left-0 w-full animate-[progress_1.8s_ease-in-out_infinite] ${isExit ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent' : 'bg-gradient-to-r from-transparent via-brand-accent to-transparent'}`} />
                    </div>
                    
                    <div className="flex justify-between items-center opacity-40">
                         <div className="flex gap-1">
                             {[0,1,2].map(i => <div key={i} className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-sm ${isExit ? 'bg-blue-400/40' : 'bg-white/20'}`} />)}
                         </div>
                         <span className="text-[7px] sm:text-[8px] font-black text-slate-600 uppercase tracking-widest">{isExit ? 'Session Logged' : 'Global Protocol 2026.4'}</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scanline {
                    0% { transform: translateY(-100px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(110vh); opacity: 0; }
                }
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes dash {
                    to { stroke-dashoffset: -20; }
                }
                .perspective-1000 { perspective: 1000px; }
                .translate-z-10 { transform: translateZ(50px); }
                .translate-z-20 { transform: translateZ(80px); }
                .-rotate-y-20 { transform: rotateY(-30deg) translateZ(-20px); }
                .rotate-y-20 { transform: rotateY(30deg) translateZ(-20px); }
            `}</style>
        </div>
    );
};

const QuickColorPicker: React.FC<{ currentColor: string; onChange: (c: string) => void }> = ({ currentColor, onChange }) => {
    const presets = ['#FFFFFF', '#FBBF24', '#38BDF8', '#F43F5E', '#10B981', '#000000'];
    return (
        <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-brand-light/80 animate-in fade-in slide-in-from-left-2 duration-300 overflow-x-auto no-scrollbar py-1">
            {presets.map(c => (
                <button
                    key={c}
                    onClick={() => onChange(c)}
                    className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-full border-2 transition-all ${currentColor === c ? 'border-brand-accent scale-110 shadow-md ring-1 ring-brand-accent/30' : 'border-white/50 hover:scale-110'}`}
                    style={{ backgroundColor: c }}
                />
            ))}
            <div className="relative w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-full overflow-hidden border-2 border-white/50 hover:scale-110 transition-all shadow-sm">
                <input 
                    type="color" 
                    value={currentColor} 
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scale-[2]"
                />
                <div className="w-full h-full bg-[conic-gradient(from_0deg,red,orange,yellow,green,cyan,blue,magenta,red)]" />
            </div>
        </div>
    );
};

const TacticalAnalysisHub: React.FC<{ formation: Formation; containerWidth: string; boardTitle: string; isBallCentric?: boolean; delayClass?: string }> = ({ formation, containerWidth, boardTitle, isBallCentric = false, delayClass = "" }) => {
    const baseFormation = Object.keys(TACTICAL_INSIGHTS).find(key => formation.startsWith(key)) || 'Default';
    const data = TACTICAL_INSIGHTS[baseFormation];
    const summaryText = isBallCentric ? data.ballSummary : data.summary;
    const strengths = isBallCentric ? data.ballStrengths : data.strengths;
    const weaknesses = isBallCentric ? data.ballWeaknesses : data.weaknesses;
    const hubTitle = isBallCentric ? "Ball Tactics" : "System";

    return (
        <div className={`w-full ${containerWidth} transition-all duration-500 mb-6 sm:mb-12 animate-in fade-in slide-in-from-bottom-8 ${delayClass} duration-1000 fill-mode-both px-2 sm:px-0`}>
            <div className="bg-brand-darker rounded-2xl sm:rounded-3xl border border-brand-light shadow-sm overflow-hidden p-4 sm:p-10">
                <div className="mb-3 sm:mb-6 flex items-center justify-between border-b border-brand-light pb-3 sm:pb-4">
                    <h4 className={`text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${isBallCentric ? 'bg-blue-500/10 text-blue-500' : 'bg-brand-accent/10 text-brand-accent'}`}>{boardTitle}</h4>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                         {isBallCentric && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>}
                         <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-brand-subtext">{isBallCentric ? 'Dynamics' : 'Analytics'}</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 sm:gap-12">
                    <div className="flex-1 space-y-2 sm:space-y-4">
                        <div className="px-2 py-0.5 border rounded-lg text-[8px] sm:text-[10px] font-black uppercase tracking-widest bg-brand-text/5 border-brand-text/10 text-brand-text w-fit">{data.style}</div>
                        <h3 className="text-lg sm:text-3xl font-black text-brand-text flex items-baseline gap-2">
                           {formation} <span className="text-brand-subtext font-normal text-[10px] sm:text-lg">{hubTitle}</span>
                        </h3>
                        <p className="text-brand-subtext text-[11px] sm:text-base leading-relaxed font-medium">
                            {summaryText}
                        </p>
                    </div>
                    <div className="flex-1 space-y-2 sm:space-y-4">
                        <h4 className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1.5">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {isBallCentric ? 'Possession' : 'Strengths'}
                        </h4>
                        <ul className="space-y-1 sm:space-y-3">
                            {strengths.map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-brand-text text-[11px] sm:text-sm font-bold">
                                    <span className="mt-0.5 text-emerald-500 shrink-0 h-3 w-3"><CheckIcon /></span>
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 space-y-2 sm:space-y-4">
                        <h4 className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
                           <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> {isBallCentric ? 'Risks' : 'Weaknesses'}
                        </h4>
                        <ul className="space-y-1 sm:space-y-3">
                            {weaknesses.map((w, i) => (
                                <li key={i} className="flex items-start gap-2 text-brand-text text-[11px] sm:text-sm font-bold">
                                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                                    <span>{w}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SpeedSelector: React.FC<{ currentVal: number; onChange: (val: number) => void }> = ({ currentVal, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const speeds = [
        { label: 'Slow', val: 2400 },
        { label: 'Normal', val: 1400 },
        { label: 'Fast', val: 800 },
        { label: 'Instant', val: 300 }
    ];
    const currentLabel = speeds.find(s => s.val === currentVal)?.label || 'Normal';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-2 py-1.5 bg-brand-light hover:bg-white rounded-lg text-[8px] sm:text-[11px] font-black uppercase transition-all border border-brand-light shadow-sm text-brand-text whitespace-nowrap"
            >
                <span>{currentLabel}</span>
                <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
            </button>
            {isOpen && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-brand-light rounded-lg shadow-xl z-50 py-1 min-w-[80px] sm:min-w-[120px] animate-in fade-in slide-in-from-top-2 duration-200">
                    {speeds.map(s => (
                        <button
                            key={s.label}
                            onClick={() => { onChange(s.val); setIsOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-[9px] sm:text-xs font-bold uppercase transition-colors hover:bg-brand-light ${currentVal === s.val ? 'text-brand-accent bg-brand-light/30' : 'text-brand-text bg-white'}`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const BoardActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; disabled?: boolean; variant?: 'default' | 'reset' | 'ball' | 'all' }> = ({ icon, label, onClick, disabled, variant = 'default' }) => {
    let variantClasses = 'bg-brand-darker border-brand-light text-brand-text hover:bg-white hover:border-brand-accent/50'; 
    if (variant === 'reset') variantClasses = 'bg-white text-slate-600 border-slate-200 hover:text-blue-600';
    if (variant === 'ball') variantClasses = 'bg-white text-brand-text border-slate-200 hover:border-brand-accent hover:bg-brand-accent/5 ring-1 ring-slate-100';
    if (variant === 'all') variantClasses = 'bg-slate-800 text-white border-slate-700 hover:bg-slate-900';

    return (
        <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            disabled={disabled}
            className="flex items-center justify-center gap-1.5 px-2 sm:px-4 py-1.5 rounded-lg font-bold transition-all duration-75 text-[10px] sm:text-sm border shadow-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 bg-brand-darker border-brand-light text-brand-text hover:bg-white hover:border-brand-accent/50"
        >
            <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center shrink-0">{icon}</span>
            <span className="hidden xs:inline lg:inline whitespace-nowrap">{label}</span>
        </button>
    );
};

const HeaderModeButton: React.FC<{ label: string; icon: React.ReactNode; isActive: boolean; onClick: () => void; title?: string }> = ({ label, icon, isActive, onClick, title }) => (
    <button
        onClick={onClick}
        className={`relative flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-[10px] sm:text-sm font-bold shrink-0 overflow-hidden group ${
        isActive 
            ? 'text-brand-text bg-white shadow-sm ring-1 ring-brand-light' 
            : 'text-brand-subtext hover:text-brand-text'
        }`}
        title={title || label}
    >
        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-brand-accent rounded-r-full animate-in slide-in-from-left-1 duration-300"></div>}
        <span className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive ? 'scale-110 text-brand-accent' : 'opacity-70 group-hover:opacity-100'}`}>{icon}</span>
        <span className={`transition-all duration-300 ${isActive ? 'translate-x-0 opacity-100' : 'hidden xl:inline'}`}>{label}</span>
    </button>
);

const InstructionPanel: React.FC<{ notes: Note[], onRemove: (id: string) => void, activeBoard: number, isVisible: boolean, onToggle: () => void, isNoteMode: boolean }> = ({ notes, onRemove, activeBoard, isVisible, onToggle, isNoteMode }) => (
    <>
      {isVisible && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] md:hidden" onClick={onToggle}/>}
      <div className={`fixed md:relative z-[100] md:z-auto h-full bg-slate-50 border-r border-slate-200 overflow-hidden shadow-inner transition-all duration-300 ease-in-out ${isVisible ? 'translate-x-0 w-64 md:w-72' : '-translate-x-full md:translate-x-0 md:w-0'}`}>
          <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between min-h-[60px]">
              <div className="flex flex-col">
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tactical Center</h3>
                  <h2 className="text-sm font-bold text-slate-800">Instructions</h2>
              </div>
              <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-md font-bold ring-1 ring-blue-100 mr-1">B{activeBoard}</span>
                  <button onClick={onToggle} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <CloseIcon />
                  </button>
              </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-50/50 h-[calc(100vh-100px)]">
              {notes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className={`w-8 h-8 mb-3 transition-all duration-500 ${isNoteMode ? 'text-brand-accent animate-bounce' : 'opacity-20 text-slate-500'}`}><TextIcon /></div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-slate-500">No instructions</p>
                  </div>
              ) : (
                  notes.map((note) => (
                      <div key={note.id} className="group bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-[6px] relative animate-in slide-in-from-left-4 duration-300" style={{ borderLeftColor: note.color }}>
                          <div className="flex justify-between items-start mb-1.5">
                              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Memo</span>
                              <button onClick={() => onRemove(note.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg"><TrashIcon /></button>
                          </div>
                          <p className="text-[11px] sm:text-sm font-semibold text-slate-700 leading-relaxed whitespace-pre-wrap">{note.text}</p>
                      </div>
                  ))
              )}
          </div>
      </div>
    </>
);

const TacticalToolbar: React.FC<{ onUndo: () => void; onClear: () => void; onReset: () => void; isAnimating: boolean }> = ({ onUndo, onClear, onReset, isAnimating }) => (
    <div className="flex items-center justify-end gap-1.5 p-2 sm:p-4 bg-white border-t border-brand-light">
        <button 
            onClick={onUndo}
            disabled={isAnimating}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-white border border-brand-light rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
            <UndoIcon />
            <span className="hidden xs:inline">Undo</span>
        </button>
        <button 
            onClick={onClear}
            disabled={isAnimating}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-white border border-brand-light rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
            <TrashIcon />
            <span className="hidden xs:inline">Clear</span>
        </button>
        <button 
            onClick={onReset}
            disabled={isAnimating}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 border border-red-600 rounded-lg text-[10px] font-bold text-white hover:bg-red-700 transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
            <RewindIcon />
            <span className="hidden sm:inline">Reset Board Tactic</span>
            <span className="sm:hidden">Reset</span>
        </button>
    </div>
);

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [language, setLanguage] = useState('en');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBoardTransitioning, setIsBoardTransitioning] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isSetupSidebarOpen, setIsSetupSidebarOpen] = useState(false);
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true);
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(false);
  const [activeBoard, setActiveBoard] = useState<1 | 2>(1);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(InteractionMode.Move);
  const [drawingColor, setDrawingColor] = useState('#FFFFFF');
  const [activeInfoPage, setActiveInfoPage] = useState<string | null>(null);
  
  const [isVertical, setIsVertical] = useState(window.innerHeight > window.innerWidth);
  const [activeTeamTab, setActiveTeamTab] = useState<'home' | 'away'>('home');
  const [playbackDuration1, setPlaybackDuration1] = useState(1400); 
  const [playbackDuration2, setPlaybackDuration2] = useState(1400); 
  
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteInputText, setNoteInputText] = useState('');
  const [noteColorChoice, setNoteColorChoice] = useState('#FBBF24');
  const [pendingNoteData, setPendingNoteData] = useState<{ id: string, position: Position } | null>(null);

  // Guided Mode State
  const [showToolHints, setShowToolHints] = useState(true);
  const [toolHintVisible, setToolHintVisible] = useState(false);

  const toolsScrollRef = useRef<HTMLDivElement>(null);
  const scrollTools = (direction: 'left' | 'right') => {
      if (toolsScrollRef.current) {
          const amount = 150;
          toolsScrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
      }
  };

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsVertical(window.innerHeight > window.innerWidth);
        } else {
            setIsVertical(false);
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeShapeType, setActiveShapeType] = useState<'x' | 'circle' | 'box' | 'space'>('x');
  const [activeShapeSize, setActiveShapeSize] = useState(3.5);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);

  // Board 1 States
  const [players1, setPlayers1] = useState(() => generatePlayers('home', '4-4-2').concat(generatePlayers('away', '4-3-3')));
  const [drawings1, setDrawings1] = useState<Drawing[]>([]);
  const [notes1, setNotes1] = useState<Note[]>([]);
  const [selectedPlayerIds1, setSelectedPlayerIds1] = useState<string[]>([]);
  const [homeColor1, setHomeColor1] = useState('#DA291C');
  const [awayColor1, setAwayColor1] = useState('#034694');
  const [homeFormation1, setHomeFormation1] = useState<Formation>('4-4-2');
  const [awayFormation1, setAwayFormation1] = useState<Formation>('4-3-3');
  const [isAnimating1, setIsAnimating1] = useState(false);
  const animationFrameRef1 = useRef<number | null>(null);

  // Board 2 States
  const [players2, setPlayers2] = useState(() => generatePlayers('home', '4-3-3').concat(generatePlayers('away', '4-2-3-1')));
  const [drawings2, setDrawings2] = useState<Drawing[]>([]);
  const [notes2, setNotes2] = useState<Note[]>([]);
  const [selectedPlayerIds2, setSelectedPlayerIds2] = useState<string[]>([]);
  const [homeColor2, setHomeColor2] = useState('#6CABDD');
  const [awayColor2, setAwayColor2] = useState('#FFFFFF');
  const [homeFormation2, setHomeFormation2] = useState<Formation>('4-3-3');
  const [awayFormation2, setAwayFormation2] = useState<Formation>('4-2-3-1');
  const [ball, setBall] = useState<Ball>({ id: 'ball-1', position: { x: 50, y: 50 } });
  const [ballPossessionPlayerId2, setBallPossessionPlayerId2] = useState<string | null>(null);
  const [isAnimating2, setIsAnimating2] = useState(false);
  const animationFrameRef2 = useRef<number | null>(null);

  const [isAICountering, setIsAICountering] = useState(false);

  const handleModeChange = (mode: InteractionMode) => {
    setInteractionMode(mode);
    if (showToolHints) setToolHintVisible(true);
    
    if (mode === InteractionMode.Vector) setActiveShapeType('space');
    else if (mode === InteractionMode.Shape) if (activeShapeType === 'space') setActiveShapeType('x');
    if (mode !== InteractionMode.Shape && mode !== InteractionMode.Vector) setSelectedShapeId(null);
    if (mode === InteractionMode.Note) {
        setPendingNoteData({ id: Date.now().toString(), position: { x: 50, y: 50 } });
        setNoteInputText('');
        setIsNoteModalOpen(true);
    }
  };

  const handleAddShape = (boardNum: 1 | 2, pos: Position, size?: number) => {
    const newShape: MarkerShape = {
        id: Date.now().toString(),
        type: 'shape',
        shapeType: activeShapeType,
        position: pos,
        size: size ?? activeShapeSize,
        color: drawingColor,
        isLocked: false
    };
    if (boardNum === 1) setDrawings1(prev => [...prev, newShape]);
    else setDrawings2(prev => [...prev, newShape]);
    setSelectedShapeId(newShape.id);
  };

  const handleUpdateShapeSize = (newSize: number) => {
    setActiveShapeSize(newSize);
    if (selectedShapeId) {
        const update = (prev: Drawing[]) => prev.map(d => 
            d.id === selectedShapeId && d.type === 'shape' ? { ...d, size: newSize } : d
        );
        activeBoard === 1 ? setDrawings1(update) : setDrawings2(update);
    }
  };

  const handleToggleShapeLock = () => {
    if (selectedShapeId) {
        const update = (prev: Drawing[]) => prev.map(d => 
            d.id === selectedShapeId && d.type === 'shape' ? { ...d, isLocked: !d.isLocked } : d
        );
        activeBoard === 1 ? setDrawings1(update) : setDrawings2(update);
    }
  };

  const handleUpdateShapeColor = (newColor: string) => {
    setDrawingColor(newColor);
    if (selectedShapeId) {
        const update = (prev: Drawing[]) => prev.map(d => 
            d.id === selectedShapeId && d.type === 'shape' ? { ...d, color: newColor } : d
        );
        activeBoard === 1 ? setDrawings1(update) : setDrawings2(update);
    }
  };

  const handleGiveBall = useCallback((id: string) => {
    if (ballPossessionPlayerId2 === id) {
        setBallPossessionPlayerId2(null);
        setSelectedPlayerIds2([]);
        return;
    }
    setBallPossessionPlayerId2(id);
    const player = players2.find(p => p.id === id);
    if (player) setBall(prev => ({ ...prev, position: { x: player.position.x, y: player.position.y + 4.5 } }));
    setSelectedPlayerIds2([id]);
  }, [players2, ballPossessionPlayerId2]);

  const handleFormationChange = (boardNum: 1 | 2, team: 'home' | 'away', formation: Formation) => {
    const setPlayers = boardNum === 1 ? setPlayers1 : setPlayers2;
    const players = boardNum === 1 ? players1 : players2;
    const setIsAnimating = boardNum === 1 ? setIsAnimating1 : setIsAnimating2;
    const animFrameRef = boardNum === 1 ? animationFrameRef1 : animationFrameRef2;
    const setFormation = team === 'home' ? (boardNum === 1 ? setHomeFormation1 : setHomeFormation2) : (boardNum === 1 ? setAwayFormation1 : setAwayFormation2);
    setFormation(formation);
    const formationData = FORMATIONS[formation];
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsAnimating(true);
    const startPositions = players.map(p => ({ id: p.id, pos: { ...p.position } }));
    const duration = 1200; 
    let start: number | null = null;
    const animateFormation = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const rawT = Math.min(elapsed / duration, 1);
        const t = easeInOutCubic(rawT);
        setPlayers(prev => {
            const teamPlayers = prev.filter(p => p.team === team);
            const otherPlayers = prev.filter(p => p.team !== team);
            const updatedTeamPlayers = teamPlayers.map((p, idx) => {
                if (idx >= formationData.length) return p;
                const data = formationData[idx];
                const startP = startPositions.find(sp => sp.id === p.id)?.pos || p.position;
                const targetPos = team === 'home' ? data.pos : { x: 100 - data.pos.x, y: data.pos.y };
                const nextPos = { x: startP.x + (targetPos.x - startP.x) * t, y: startP.y + (targetPos.y - startP.y) * t };
                if (boardNum === 2 && ballPossessionPlayerId2 === p.id) setBall(b => ({ ...b, position: { x: nextPos.x, y: nextPos.y + 4.5 } }));
                return { ...p, position: nextPos, ...(rawT === 1 ? { role: data.role, initialPosition: nextPos } : {}) };
            });
            return [...updatedTeamPlayers, ...otherPlayers];
        });
        if (rawT < 1) animFrameRef.current = requestAnimationFrame(animateFormation);
        else {
            setIsAnimating(false);
            if (boardNum === 2 && team === 'home') {
                const counterFormation = FORMATION_COUNTERS[formation];
                if (counterFormation) {
                    setIsAICountering(true);
                    setTimeout(() => {
                        handleFormationChange(2, 'away', counterFormation);
                        setTimeout(() => setIsAICountering(false), 2000);
                    }, 800);
                }
            }
        }
    };
    animFrameRef.current = requestAnimationFrame(animateFormation);
  };

  const handleRemoveDrawing = (boardNum: 1 | 2, id: string) => {
    if (boardNum === 1) setDrawings1(prev => prev.filter(d => d.id !== id));
    else setDrawings2(prev => prev.filter(d => d.id !== id));
    if (id === selectedShapeId) setSelectedShapeId(null);
  };

  const runBoardAnimation = (players: Player[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>>, drawings: Drawing[], setDrawings: React.Dispatch<React.SetStateAction<Drawing[]>>, duration: number, setIsAnimating: (v: boolean) => void, animFrameRef: React.MutableRefObject<number | null>, ballRef?: { val: Ball, set: React.Dispatch<React.SetStateAction<Ball>>, posId: string | null }) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const motionDrawings = drawings.filter(d => ['arrow', 'path', 'curve'].includes(d.type));
    if (motionDrawings.length === 0) return;
    const usedDrawingIds = new Set<string>();
    const matchedPlayerIds = new Set<string>();
    const moveMap: { playerId: string, drawing: Drawing }[] = [];
    motionDrawings.forEach(drawing => {
        const firstPoint = (drawing as any).points[0];
        let closestPlayerId: string | null = null;
        let minDistance = 3.5;
        players.forEach(p => {
            if (matchedPlayerIds.has(p.id)) return;
            const playerFieldXScreen = 5 + (p.position.x * 0.9);
            const playerFieldYScreen = 5 + (p.position.y * 0.9);
            const dx = firstPoint.x - playerFieldXScreen;
            const dy = firstPoint.y - playerFieldYScreen;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < minDistance) { minDistance = dist; closestPlayerId = p.id; }
        });
        if (closestPlayerId) { matchedPlayerIds.add(closestPlayerId); usedDrawingIds.add(drawing.id); moveMap.push({ playerId: closestPlayerId, drawing }); }
    });
    if (moveMap.length === 0) return;
    setDrawings(prev => prev.filter(d => !usedDrawingIds.has(d.id)));
    setIsAnimating(true);
    let start: number | null = null;
    const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const rawT = Math.min(elapsed / duration, 1);
        const t = easeInOutCubic(rawT);
        setPlayers(prev => prev.map(p => {
            const move = moveMap.find(m => m.playerId === p.id);
            if (!move) return p;
            let nextFieldX = p.position.x, nextFieldY = p.position.y;
            if (move.drawing.type === 'curve') {
                const curve = move.drawing as CurveArrow;
                const [p0, p1, p2] = curve.points;
                const worldX = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
                const worldY = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
                nextFieldX = (worldX - 5) / 0.9; nextFieldY = (worldY - 5) / 0.9;
            } else if (move.drawing.type === 'path') {
                const path = move.drawing as Path;
                const pts = path.points, segmentCount = pts.length - 1;
                const segmentIndex = Math.min(Math.floor(t * segmentCount), segmentCount - 1);
                const localT = (t * segmentCount) - segmentIndex;
                const pStart = pts[segmentIndex], pEnd = pts[segmentIndex + 1];
                const worldX = pStart.x + (pEnd.x - pStart.x) * localT;
                const worldY = pStart.y + (pEnd.y - pStart.y) * localT;
                nextFieldX = (worldX - 5) / 0.9; nextFieldY = (worldY - 5) / 0.9;
            } else if (move.drawing.type === 'arrow') {
                const arrow = move.drawing as Arrow;
                const pStart = arrow.points[0], pEnd = arrow.points[1];
                const worldX = pStart.x + (pEnd.x - pStart.x) * t;
                const worldY = pStart.y + (pEnd.y - pStart.y) * t;
                nextFieldX = (worldX - 5) / 0.9; nextFieldY = (worldY - 5) / 0.9;
            }
            if (ballRef && ballRef.posId === p.id) ballRef.set(b => ({ ...b, position: { x: nextFieldX, y: nextFieldY + 4.5 } }));
            return { ...p, position: { x: nextFieldX, y: nextFieldY } };
        }));
        if (rawT < 1) animFrameRef.current = requestAnimationFrame(animate);
        else setIsAnimating(false);
    };
    animFrameRef.current = requestAnimationFrame(animate);
  };

  const handlePlayBallAnimation2 = () => {
    if (animationFrameRef2.current) cancelAnimationFrame(animationFrameRef2.current);
    const motionDrawings = drawings2.filter(d => ['arrow', 'path', 'curve'].includes(d.type));
    if (motionDrawings.length === 0) return;
    const ballFieldXScreen = 5 + (ball.position.x * 0.9), ballFieldYScreen = 5 + (ball.position.y * 0.9);
    const drawing = motionDrawings.find(d => {
        const firstPoint = (d as any).points[0];
        const dx = firstPoint.x - ballFieldXScreen, dy = firstPoint.y - ballFieldYScreen;
        return Math.sqrt(dx*dx + dy*dy) < 6;
    });
    if (!drawing) return;
    setDrawings2(prev => prev.filter(d => d.id !== drawing.id));
    setBallPossessionPlayerId2(null);
    setIsAnimating2(true);
    let start: number | null = null, duration = playbackDuration2;
    const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start, rawT = Math.min(elapsed / duration, 1), t = easeInOutCubic(rawT);
        let nextWorldX = ballFieldXScreen, nextWorldY = ballFieldYScreen;
        if (drawing.type === 'curve') {
            const curve = drawing as CurveArrow;
            const [p0, p1, p2] = curve.points;
            nextWorldX = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
            nextWorldY = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
        } else if (drawing.type === 'path') {
            const path = drawing as Path;
            const pts = path.points, segmentCount = pts.length - 1, segmentIndex = Math.min(Math.floor(t * segmentCount), segmentCount - 1), localT = (t * segmentCount) - segmentIndex, pStart = pts[segmentIndex], pEnd = pts[segmentIndex + 1];
            nextWorldX = pStart.x + (pEnd.x - pStart.x) * localT; nextWorldY = pStart.y + (pEnd.y - pStart.y) * localT;
        } else if (drawing.type === 'arrow') {
            const arrow = drawing as Arrow;
            const pStart = arrow.points[0], pEnd = arrow.points[1];
            nextWorldX = pStart.x + (pEnd.x - pStart.x) * t; nextWorldY = pStart.y + (pEnd.y - pStart.y) * t;
        }
        setBall(b => ({ ...b, position: { x: (nextWorldX - 5) / 0.9, y: (nextWorldY - 5) / 0.9 } }));
        if (rawT < 1) animationFrameRef2.current = requestAnimationFrame(animate);
        else setIsAnimating2(false);
    };
    animationFrameRef2.current = requestAnimationFrame(animate);
  };

  const handleResetBoard1 = () => runResetAnimation(players1, setPlayers1, setIsAnimating1, animationFrameRef1, () => { setDrawings1([]); setNotes1([]); setSelectedPlayerIds1([]); setSelectedShapeId(null); });
  const handleResetBoard2 = () => runResetAnimation(players2, setPlayers2, setIsAnimating2, animationFrameRef2, () => { setDrawings2([]); setNotes2([]); setBallPossessionPlayerId2(null); setSelectedPlayerIds2([]); setSelectedShapeId(null); }, { val: ball, set: setBall });
  const handlePlayerMove1 = useCallback((id: string, newPos: Position) => setPlayers1(prev => prev.map(p => p.id === id ? { ...p, position: newPos } : p)), []);
  const handlePlayerMove2 = useCallback((id: string, newPos: Position) => {
    setPlayers2(prev => prev.map(p => p.id === id ? { ...p, position: newPos } : p));
    if (ballPossessionPlayerId2 === id) setBall(prev => ({ ...prev, position: { x: newPos.x, y: newPos.y + 4.5 } }));
  }, [ballPossessionPlayerId2]);

  const handleStartSession = () => { setIsTransitioning(true); setTimeout(() => { setViewMode('app'); setIsTransitioning(false); }, 2400); };
  const handleExitSession = () => { setIsExiting(true); setTimeout(() => { setViewMode('landing'); setIsExiting(false); }, 2500); };
  const handleSwitchBoard = (board: 1 | 2) => { if (board === activeBoard) return; setIsBoardTransitioning(true); setTimeout(() => { setActiveBoard(board); setIsBoardTransitioning(false); }, 1800); };

  const runResetAnimation = (players: Player[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>>, setIsAnimating: (v: boolean) => void, animFrameRef: React.MutableRefObject<number | null>, onComplete: () => void, ballState?: { val: Ball, set: React.Dispatch<React.SetStateAction<Ball>> }) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsAnimating(true);
    const startPositions = players.map(p => ({ id: p.id, pos: { ...p.position } }));
    const ballStart = ballState ? { ...ballState.val.position } : null;
    const duration = 1200; 
    let start: number | null = null;
    const animateReset = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start, rawT = Math.min(elapsed / duration, 1), t = easeInOutCubic(rawT);
        setPlayers(prev => prev.map(p => {
            const currentStart = startPositions.find(sp => sp.id === p.id)?.pos || p.position;
            return { ...p, position: { x: currentStart.x + (p.initialPosition.x - currentStart.x) * t, y: currentStart.y + (p.initialPosition.y - currentStart.y) * t } };
        }));
        if (ballState && ballStart) ballState.set(b => ({ ...b, position: { x: ballStart.x + (50 - ballStart.x) * t, y: ballStart.y + (50 - ballStart.y) * t } }));
        if (rawT < 1) animFrameRef.current = requestAnimationFrame(animateReset);
        else { setIsAnimating(false); onComplete(); }
    };
    animFrameRef.current = requestAnimationFrame(animateReset);
  };

  const handlePlayAnimation1 = () => runBoardAnimation(players1, setPlayers1, drawings1, setDrawings1, playbackDuration1, setIsAnimating1, animationFrameRef1);
  const handlePlayAnimation2 = () => runBoardAnimation(players2, setPlayers2, drawings2, setDrawings2, playbackDuration2, setIsAnimating2, animationFrameRef2, { val: ball, set: setBall, posId: ballPossessionPlayerId2 });
  
  const sidebarProps = {
    interactionMode, setInteractionMode: handleModeChange, drawingColor, setDrawingColor: handleUpdateShapeColor,
    undoDrawing: () => activeBoard === 1 ? setDrawings1(prev => prev.slice(0, -1)) : setDrawings2(prev => prev.slice(0, -1)),
    clearDrawings: () => { activeBoard === 1 ? setDrawings1([]) : setDrawings2([]); setSelectedShapeId(null); },
    onResetTactic: () => activeBoard === 1 ? handleResetBoard1() : handleResetBoard2(),
    homeFormation: activeBoard === 1 ? homeFormation1 : homeFormation2, setHomeFormation: (f: Formation) => handleFormationChange(activeBoard, 'home', f), 
    awayFormation: activeBoard === 1 ? awayFormation1 : awayFormation2, setAwayFormation: (f: Formation) => handleFormationChange(activeBoard, 'away', f),
    homeColor: activeBoard === 1 ? homeColor1 : homeColor2, setHomeColor: (c: string) => activeBoard === 1 ? setHomeColor1(c) : setHomeColor2(c),
    awayColor: activeBoard === 1 ? awayColor1 : awayColor2, setAwayColor: (c: string) => activeBoard === 1 ? setAwayColor1(c) : setAwayColor2(c),
    players: activeBoard === 1 ? players1 : players2, onGoHome: handleExitSession,
    onPlayerNameChange: (id: string, name: string) => { const set = activeBoard === 1 ? setPlayers1 : setPlayers2; set(prev => prev.map(p => p.id === id ? {...p, name} : p))},
    onPlayerNumberChange: (id: string, number: number) => { const set = activeBoard === 1 ? setPlayers1 : setPlayers2; set(prev => prev.map(p => p.id === id ? {...p, number: number} : p))},
    onSelectAll: () => activeBoard === 1 ? setSelectedPlayerIds1(players1.map(p => p.id)) : setSelectedPlayerIds2(players2.map(p => p.id)),
    onSelectHome: () => activeBoard === 1 ? setSelectedPlayerIds1(players1.filter(p => p.team === 'home').map(p => p.id)) : setSelectedPlayerIds2(players2.filter(p => p.team === 'home').map(p => p.id)),
    onSelectAway: () => activeBoard === 1 ? setSelectedPlayerIds1(players1.filter(p => p.team === 'away').map(p => p.id)) : setSelectedPlayerIds2(players2.filter(p => p.team === 'away').map(p => p.id)),
    onDeselectAll: () => activeBoard === 1 ? setSelectedPlayerIds1([]) : setSelectedPlayerIds2([]),
    selectedHomeTeam: 'Custom', onSelectHomeTeam: () => {}, selectedAwayTeam: 'Custom', onSelectAwayTeam: () => {}, savedTactics: [], onLoadTactic: () => {}, onDeleteTactic: () => {}, onSaveTactic: () => {}, onRenumberTeam: () => {},
    activeShapeType, setActiveShapeType, activeShapeSize, setActiveShapeSize: handleUpdateShapeSize,
    onToggleShapeLock: handleToggleShapeLock,
    selectedShapeLocked: (activeBoard === 1 ? drawings1 : drawings2).find(d => d.id === selectedShapeId && d.type === 'shape')?.isLocked || false,
    activeTeamTab, setActiveTeamTab 
  };

  const handleAddNoteTrigger = (note: Note) => { setPendingNoteData({ id: note.id, position: note.position }); setNoteInputText(''); setIsNoteModalOpen(true); };
  const handleSaveInstruction = () => {
    if (pendingNoteData && noteInputText.trim()) {
        const n = { id: pendingNoteData.id, text: noteInputText.trim(), position: pendingNoteData.position, color: noteColorChoice };
        activeBoard === 1 ? setNotes1(p => [...p, n]) : setNotes2(p => [...p, n]);
        setIsInstructionsVisible(true);
    }
    setIsNoteModalOpen(false); setPendingNoteData(null); setNoteInputText(''); setInteractionMode(InteractionMode.Move); 
  };

  const isDrawingModeActive = [InteractionMode.Arrows, InteractionMode.Path, InteractionMode.Curve, InteractionMode.Draw, InteractionMode.Shape, InteractionMode.Vector].includes(interactionMode);
  const selectedShape = (activeBoard === 1 ? drawings1 : drawings2).find(d => d.id === selectedShapeId && d.type === 'shape') as MarkerShape | undefined;

  const currentT = translations[language] || translations.en;
  const isRTL = currentT.dir === 'rtl';

  if (isTransitioning) return <MotionTransition isInitial={true} label="Initializing Workspace" />;
  if (isBoardTransitioning) return <MotionTransition targetBoard={activeBoard === 1 ? 2 : 1} label={`Switching Board`} />;
  if (isExiting) return <MotionTransition isExit={true} label="Concluding Session" />;
  if (viewMode === 'landing') return <LandingPage onStart={handleStartSession} onOpenPage={(p) => setActiveInfoPage(p)} language={language} setLanguage={setLanguage} />;

  const pitchContainerWidth = isVertical 
    ? 'w-full max-w-[480px]' 
    : (window.innerWidth < 1024 ? 'w-full px-2' : (isDesktopSidebarVisible ? 'max-w-[1000px]' : 'max-w-[1120px]'));

  return (
    <div className="flex h-screen bg-brand-dark overflow-hidden flex-col md:flex-row relative animate-in fade-in duration-700" dir={currentT.dir}>
        <InstructionPanel notes={activeBoard === 1 ? notes1 : notes2} onRemove={(id) => activeBoard === 1 ? setNotes1(p => p.filter(n => n.id !== id)) : setNotes2(p => p.filter(n => n.id !== id))} activeBoard={activeBoard} isVisible={isInstructionsVisible} onToggle={() => setIsInstructionsVisible(!isInstructionsVisible)} isNoteMode={interactionMode === InteractionMode.Note} />
        <div className="flex-1 relative flex flex-col h-full overflow-hidden">
            <div className="relative z-30 bg-white border-b border-brand-light p-1 sm:p-2 flex items-center gap-1 sm:gap-2 shadow-sm justify-between flex-wrap sm:flex-nowrap">
                <div className={`flex items-center gap-1.5 shrink-0 px-1 sm:px-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-brand-accent p-1.5 sm:p-2 shadow-sm">
                        <LogoIcon />
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center min-w-0 mx-1 sm:mx-2 order-last sm:order-none w-full sm:w-auto mt-1 sm:mt-0">
                    <div className={`flex items-center gap-1 max-w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button onClick={() => scrollTools(isRTL ? 'right' : 'left')} className="p-1 sm:p-1.5 bg-brand-light hover:bg-white text-brand-subtext rounded-lg border border-brand-light shadow-sm">{isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}</button>
                        <div ref={toolsScrollRef} className={`flex items-center gap-1 p-1 bg-brand-light/30 rounded-xl overflow-x-auto max-w-full no-scrollbar border border-brand-light/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <HeaderModeButton label="Move" icon={<MoveIcon />} isActive={interactionMode === InteractionMode.Move} onClick={() => handleModeChange(InteractionMode.Move)} />
                            <HeaderModeButton label="Line" icon={<ArrowIcon />} isActive={interactionMode === InteractionMode.Arrows} onClick={() => handleModeChange(InteractionMode.Arrows)} />
                            <HeaderModeButton label="Path" icon={<PathIcon />} isActive={interactionMode === InteractionMode.Path} onClick={() => handleModeChange(InteractionMode.Path)} />
                            <HeaderModeButton label="Curve" icon={<CurveIcon />} isActive={interactionMode === InteractionMode.Curve} onClick={() => handleModeChange(InteractionMode.Curve)} />
                            <HeaderModeButton label="Draw" icon={<DrawIcon />} isActive={interactionMode === InteractionMode.Draw} onClick={() => handleModeChange(InteractionMode.Draw)} />
                            <HeaderModeButton label="Mark" icon={<MarkerIcon />} isActive={interactionMode === InteractionMode.Shape} onClick={() => handleModeChange(InteractionMode.Shape)} />
                            <HeaderModeButton label="Area" icon={<VectorIcon />} isActive={interactionMode === InteractionMode.Vector} onClick={() => handleModeChange(InteractionMode.Vector)} />
                            <HeaderModeButton label="Note" icon={<TextIcon />} isActive={interactionMode === InteractionMode.Note} onClick={() => handleModeChange(InteractionMode.Note)} />
                            <HeaderModeButton label="Erase" icon={<EraserIcon />} isActive={interactionMode === InteractionMode.Eraser} onClick={() => handleModeChange(InteractionMode.Eraser)} />
                            {isDrawingModeActive && <QuickColorPicker currentColor={drawingColor} onChange={handleUpdateShapeColor} />}
                        </div>
                        <button onClick={() => scrollTools(isRTL ? 'left' : 'right')} className="p-1 sm:p-1.5 bg-brand-light hover:bg-white text-brand-subtext rounded-lg border border-brand-light shadow-sm">{isRTL ? <ChevronLeftIcon /> : <ChevronRightIcon />}</button>
                    </div>
                </div>
                <div className={`flex items-center gap-1 sm:gap-2 shrink-0 px-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                   <button 
                        onClick={() => setShowToolHints(!showToolHints)} 
                        className={`p-2 rounded-lg transition-all border ${showToolHints ? 'bg-brand-accent/20 border-brand-accent text-[#0F172A]' : 'bg-white border-brand-light text-brand-subtext'}`} 
                        title="Toggle Guided Mode"
                   >
                        <ZapIcon />
                   </button>
                   <button onClick={() => setIsInstructionsVisible(!isInstructionsVisible)} className={`p-2 rounded-lg transition-all border ${isInstructionsVisible ? 'bg-brand-accent/10 border-brand-accent text-brand-accent' : 'bg-white border-brand-light text-brand-subtext'}`} title="Notes"><TextIcon /></button>
                   <button onClick={() => setIsSetupSidebarOpen(true)} className="md:hidden p-2 text-brand-text hover:bg-brand-light rounded-lg bg-white shadow-sm border border-brand-light"><ShirtIcon /></button>
                   {!isDesktopSidebarVisible && <button onClick={() => setIsDesktopSidebarVisible(true)} className="hidden md:flex p-2 bg-brand-accent text-brand-text rounded-md shadow-sm">{isRTL ? <ChevronLeftIcon /> : <ChevronRightIcon />}</button>}
                   <button onClick={handleExitSession} className="hidden md:flex items-center gap-2 px-3 py-2 text-brand-subtext hover:text-brand-accent font-black uppercase tracking-widest text-[10px]"><HomeIcon /></button>
                </div>
            </div>
            
            {(interactionMode === InteractionMode.Shape || interactionMode === InteractionMode.Vector) && (
                <div className="bg-white border-b border-brand-light px-2 py-1.5 flex items-center justify-center gap-4 animate-in slide-in-from-top-4 duration-300 z-20">
                    {interactionMode === InteractionMode.Shape && (
                        <div className={`flex items-center gap-2 p-1 bg-brand-light/30 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {(['x', 'circle', 'box'] as const).map(t => (
                                <button key={t} onClick={() => setActiveShapeType(t)} className={`px-3 py-1 rounded-md text-[9px] font-black uppercase transition-all ${activeShapeType === t ? 'bg-white text-brand-text shadow-sm' : 'text-brand-subtext'}`}>{t}</button>
                            ))}
                        </div>
                    )}
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <input type="range" min="1" max="60" step="0.5" value={activeShapeSize} onChange={e => handleUpdateShapeSize(parseFloat(e.target.value))} className="w-20 sm:w-32 accent-brand-accent" />
                        {selectedShape && (
                            <button onClick={handleToggleShapeLock} className={`p-1.5 rounded-md transition-all border ${selectedShape.isLocked ? 'bg-brand-accent border-brand-accent text-brand-text' : 'bg-white border-brand-light text-brand-subtext'}`}>
                                <div className="w-3.5 h-3.5 flex items-center justify-center">{selectedShape.isLocked ? <LockIcon /> : <UnlockIcon />}</div>
                            </button>
                        )}
                    </div>
                </div>
            )}
            
            <main className="flex-1 p-2 sm:p-8 flex flex-col items-center justify-start overflow-y-auto relative bg-brand-dark no-scrollbar h-full scroll-smooth">
                <div onMouseDownCapture={() => { setActiveBoard(1); setSelectedPlayerIds2([]); setBallPossessionPlayerId2(null); if (interactionMode !== InteractionMode.Shape && interactionMode !== InteractionMode.Vector) setSelectedShapeId(null); }} className={`w-full ${pitchContainerWidth} transition-all duration-700 rounded-2xl sm:rounded-3xl p-0.5 sm:p-1 border-2 sm:border-4 ${activeBoard === 1 ? 'border-brand-accent shadow-xl' : 'border-brand-light opacity-80'} bg-brand-darker mb-6 sm:mb-12`}>
                    <div className="bg-brand-darker rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-full w-full relative">
                        <div className={`flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-4 bg-brand-light/10 flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <h2 className="text-[10px] sm:text-lg font-black text-brand-text uppercase tracking-tight shrink-0">Board 1: Structural</h2>
                            <div className={`flex items-center gap-1.5 sm:gap-3 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                                <SpeedSelector currentVal={playbackDuration1} onChange={setPlaybackDuration1} />
                                <BoardActionButton icon={<PlayIcon />} label={isAnimating1 ? "Running" : "Play"} onClick={handlePlayAnimation1} disabled={isAnimating1} />
                                <BoardActionButton icon={<ResetIcon />} label="Reset" onClick={handleResetBoard1} variant="reset" disabled={isAnimating1} />
                            </div>
                        </div>
                        <div className={`w-full relative bg-[#2A843D] transition-all duration-700 ${isVertical ? 'aspect-[68/105]' : 'aspect-[105/68]'}`}>
                            <Pitch players={players1} homeColor={homeColor1} awayColor={awayColor1} interactionMode={interactionMode} drawingColor={drawingColor} drawings={drawings1} setDrawings={setDrawings1} selectedPlayerIds={selectedPlayerIds1} onPlayerSelect={(id) => { setActiveBoard(1); setSelectedPlayerIds1(prev => prev.includes(id) ? [] : [id]); setSelectedShapeId(null); }} onClearSelection={() => setSelectedPlayerIds1([])} animationSpeed={0} onPlayerMove={handlePlayerMove1} onAddNote={handleAddNoteTrigger} notes={notes1} onRemoveDrawing={(id) => handleRemoveDrawing(1, id)} onShapePlace={(pos, size) => handleAddShape(1, pos, size)} selectedShapeId={selectedShapeId} isVertical={isVertical} onShapeSelect={(id) => { setSelectedShapeId(id); setActiveBoard(1); const s = drawings1.find(d => d.id === id) as MarkerShape; if(s) { setActiveShapeSize(s.size); setDrawingColor(s.color); } }} />
                        </div>
                        <TacticalToolbar onUndo={() => setDrawings1(prev => prev.slice(0, -1))} onClear={() => { setDrawings1([]); setSelectedShapeId(null); }} onReset={handleResetBoard1} isAnimating={isAnimating1} />
                    </div>
                </div>
                <TacticalAnalysisHub boardTitle="Board 1" formation={homeFormation1} containerWidth={pitchContainerWidth} isBallCentric={false} />
                
                <div onMouseDownCapture={() => { setActiveBoard(2); setSelectedPlayerIds1([]); if (interactionMode !== InteractionMode.Shape && interactionMode !== InteractionMode.Vector) setSelectedShapeId(null); }} className={`w-full ${pitchContainerWidth} transition-all duration-700 rounded-2xl sm:rounded-3xl p-0.5 sm:p-1 border-2 sm:border-4 ${activeBoard === 2 ? 'border-brand-accent shadow-xl' : 'border-brand-light opacity-80'} bg-brand-darker mb-6 sm:mb-12`}>
                    <div className="bg-brand-darker rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-full w-full relative">
                        <div className={`flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-4 bg-brand-light/10 flex-wrap gap-2 relative ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <h2 className="text-[10px] sm:text-lg font-black text-brand-text uppercase tracking-tight shrink-0">Board 2: Dynamic</h2>
                            {isAICountering && <div className={`absolute top-0 ${isRTL ? 'left-1/4' : 'right-1/4'} h-full flex items-center px-2 py-1 bg-blue-500 text-white text-[7px] sm:text-[10px] font-black rounded-full shadow-lg`}>AI ADAPTING</div>}
                            <div className={`flex items-center gap-1.5 sm:gap-3 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                                <SpeedSelector currentVal={playbackDuration2} onChange={setPlaybackDuration2} />
                                <BoardActionButton icon={<PlayIcon />} label={isAnimating2 ? "Running" : "Play"} onClick={handlePlayAnimation2} disabled={isAnimating2} />
                                <BoardActionButton icon={<div className="w-3 h-3 rounded-full border border-current flex items-center justify-center p-[1px]"><div className="w-full h-full bg-current rounded-full"></div></div>} label="Ball" onClick={handlePlayBallAnimation2} disabled={isAnimating2} variant="ball" />
                                <BoardActionButton icon={<ResetIcon />} label="Reset" onClick={handleResetBoard2} variant="reset" disabled={isAnimating2} />
                            </div>
                        </div>
                        <div className={`w-full relative bg-[#2A843D] transition-all duration-700 ${isVertical ? 'aspect-[68/105]' : 'aspect-[105/68]'}`}>
                            <Pitch players={players2} homeColor={homeColor2} awayColor={awayColor2} interactionMode={interactionMode} drawingColor={drawingColor} drawings={drawings2} setDrawings={setDrawings2} selectedPlayerIds={selectedPlayerIds2} onPlayerSelect={(id) => { setActiveBoard(2); handleGiveBall(id); setSelectedShapeId(null); }} onClearSelection={() => { setSelectedPlayerIds2([]); setBallPossessionPlayerId2(null); }} animationSpeed={isAnimating2 ? 0 : 0.3} onPlayerMove={handlePlayerMove2} ball={ball} onBallMove={(id, pos) => setBall(b => ({ ...b, position: pos }))} ballPossessionPlayerId={ballPossessionPlayerId2} onBallDrop={handleGiveBall} onAddNote={handleAddNoteTrigger} notes={notes2} onRemoveDrawing={(id) => handleRemoveDrawing(2, id)} onShapePlace={(pos, size) => handleAddShape(2, pos, size)} selectedShapeId={selectedShapeId} isVertical={isVertical} onShapeSelect={(id) => { setSelectedShapeId(id); setActiveBoard(2); const s = drawings2.find(d => d.id === id) as MarkerShape; if(s) { setActiveShapeSize(s.size); setDrawingColor(s.color); } }} />
                        </div>
                        <TacticalToolbar onUndo={() => setDrawings2(prev => prev.slice(0, -1))} onClear={() => { setDrawings2([]); setSelectedShapeId(null); }} onReset={handleResetBoard2} isAnimating={isAnimating2} />
                    </div>
                </div>
                <TacticalAnalysisHub boardTitle="Board 2" formation={homeFormation2} containerWidth={pitchContainerWidth} isBallCentric={true} />
            </main>
        </div>
        <Sidebar isOpen={isSetupSidebarOpen} onClose={() => setIsSetupSidebarOpen(false)} isDesktopVisible={isDesktopSidebarVisible} onDesktopToggle={() => setIsDesktopSidebarVisible(!isDesktopSidebarVisible)} activeBoard={activeBoard} setActiveBoard={handleSwitchBoard} {...sidebarProps} />
        {activeInfoPage && <InfoPages page={activeInfoPage} onClose={() => setActiveInfoPage(null)} />}
        
        {/* Animated Tool Instruction Overlay */}
        <ToolInstruction 
            mode={interactionMode} 
            isVisible={toolHintVisible && showToolHints} 
            onHide={() => setToolHintVisible(false)} 
        />

        {isNoteModalOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 border border-brand-light">
                    <h3 className="text-lg font-bold text-brand-text mb-4">Add Coaching Memo</h3>
                    <textarea value={noteInputText} onChange={(e) => setNoteInputText(e.target.value)} placeholder="Enter instruction..." className="w-full h-32 p-4 bg-brand-light/10 border border-brand-light rounded-xl outline-none focus:ring-2 focus:ring-brand-accent text-sm font-semibold mb-6" />
                    <div className="flex gap-4 mb-6">
                        {['#FBBF24', '#38BDF8', '#F43F5E', '#10B981'].map(c => (
                            <button key={c} onClick={() => setNoteColorChoice(c)} className={`w-8 h-8 rounded-full border-2 transition-all ${noteColorChoice === c ? 'border-brand-text scale-110' : 'border-white'}`} style={{ backgroundColor: c }} />
                        ))}
                    </div>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => { setIsNoteModalOpen(false); setInteractionMode(InteractionMode.Move); }} className="px-6 py-2 text-brand-subtext font-bold text-xs uppercase">Cancel</button>
                        <button onClick={handleSaveInstruction} className="px-8 py-2 bg-[#0F172A] text-white rounded-xl font-bold text-xs uppercase">Save</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
