
import React from 'react';
import { InteractionMode } from '../types';
import { CloseIcon } from './Icons';

interface ToolInstructionProps {
  mode: InteractionMode;
  onHide: () => void;
  isVisible: boolean;
}

const animations: Record<string, React.ReactNode> = {
  [InteractionMode.Move]: (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <circle cx="30" cy="30" r="8" fill="#FBBF24" className="animate-[move-demo_2s_infinite]" />
      <path d="M 50 30 L 70 30" stroke="white" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
      <style>{`
        @keyframes move-demo {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(40px); }
        }
      `}</style>
    </svg>
  ),
  [InteractionMode.Arrows]: (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <circle cx="20" cy="30" r="5" fill="#FBBF24" />
      <line x1="20" y1="30" x2="20" y2="30" stroke="#FBBF24" strokeWidth="2" className="animate-[line-grow_2s_infinite]">
        <animate attributeName="x2" from="20" to="80" dur="2s" repeatCount="indefinite" />
      </line>
      <polygon points="75,25 85,30 75,35" fill="#FBBF24" className="animate-[fade-in_2s_infinite]" />
      <style>{`
        @keyframes line-grow { 0% { opacity: 0; } 20% { opacity: 1; } 100% { opacity: 1; } }
      `}</style>
    </svg>
  ),
  [InteractionMode.Path]: (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <circle cx="20" cy="45" r="3" fill="white" className="animate-[ping_2s_infinite]" />
      <circle cx="50" cy="15" r="3" fill="white" className="animate-[ping_2s_infinite_0.5s]" />
      <circle cx="80" cy="45" r="3" fill="white" className="animate-[ping_2s_infinite_1s]" />
      <polyline points="20,45 50,15 80,45" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" className="animate-[draw-path_3s_infinite]" />
      <style>{`
        @keyframes draw-path { to { stroke-dashoffset: 0; } }
      `}</style>
    </svg>
  ),
  [InteractionMode.Curve]: (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <path d="M 20 40 Q 50 40 80 40" fill="none" stroke="#FBBF24" strokeWidth="2" className="animate-[curve-bend_2s_infinite]" />
      <circle cx="50" cy="40" r="3" fill="white" className="animate-[control-move_2s_infinite]" />
      <style>{`
        @keyframes curve-bend {
          0%, 100% { d: path('M 20 40 Q 50 40 80 40'); }
          50% { d: path('M 20 40 Q 50 10 80 40'); }
        }
        @keyframes control-move {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </svg>
  ),
  [InteractionMode.Draw]: (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <path d="M 20 30 C 30 10, 40 50, 50 30 S 70 10, 80 30" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="150" strokeDashoffset="150" className="animate-[draw-free_2s_infinite]" />
      <style>{` @keyframes draw-free { to { stroke-dashoffset: 0; } } `}</style>
    </svg>
  ),
  [InteractionMode.Shape]: (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <g className="animate-[bounce_2s_infinite]">
        <line x1="40" y1="20" x2="60" y2="40" stroke="#FBBF24" strokeWidth="3" />
        <line x1="60" y1="20" x2="40" y2="40" stroke="#FBBF24" strokeWidth="3" />
      </g>
    </svg>
  ),
  [InteractionMode.Vector]: (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <rect x="25" y="15" width="50" height="30" fill="#FBBF24" fillOpacity="0.2" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 4" className="animate-[pulse_2s_infinite]" />
    </svg>
  ),
  [InteractionMode.Note]: (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <rect x="20" y="20" width="60" height="20" rx="4" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="1" />
      <line x1="25" y1="30" x2="75" y2="30" stroke="#FBBF24" strokeWidth="2" strokeDasharray="50" strokeDashoffset="50" className="animate-[draw-path_2s_infinite]" />
    </svg>
  ),
  [InteractionMode.Eraser]: (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      <line x1="20" y1="30" x2="80" y2="30" stroke="white" strokeWidth="2" opacity="0.3" />
      <rect x="10" y="20" width="20" height="20" fill="#F43F5E" rx="2" className="animate-[erase-move_2s_infinite]" />
      <style>{`
        @keyframes erase-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(70px); }
        }
      `}</style>
    </svg>
  )
};

const labels: Record<string, { title: string; desc: string }> = {
  [InteractionMode.Move]: { title: 'Reposition', desc: 'Drag players or the ball to adjust structure.' },
  [InteractionMode.Arrows]: { title: 'Movement Line', desc: 'Drag from a player to a target to show runs or passes.' },
  [InteractionMode.Path]: { title: 'Multi-Step Run', desc: 'Click points to create complex paths. Click start dot to finish.' },
  [InteractionMode.Curve]: { title: 'Curved Action', desc: 'Click start/end, then drag the center to bend the run.' },
  [InteractionMode.Draw]: { title: 'Free Annotations', desc: 'Draw custom marks or paths anywhere on the pitch.' },
  [InteractionMode.Shape]: { title: 'Tactical Markers', desc: 'Click to place markers like X, Circle, or Boxes.' },
  [InteractionMode.Vector]: { title: 'Area Highlight', desc: 'Drag to define zones of influence or shaded regions.' },
  [InteractionMode.Note]: { title: 'Coaching Memo', desc: 'Click any spot to add detailed text instructions.' },
  [InteractionMode.Eraser]: { title: 'Cleanup Tool', desc: 'Click or drag over drawings to remove them instantly.' }
};

export const ToolInstruction: React.FC<ToolInstructionProps> = ({ mode, onHide, isVisible }) => {
  if (!isVisible || !labels[mode]) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-[100] w-[90%] sm:w-72 animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-brand-text/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden relative group">
        <button 
          onClick={onHide}
          className="absolute top-2 right-2 p-1 text-white/40 hover:text-white transition-colors"
        >
          <CloseIcon />
        </button>
        
        <div className="flex gap-4 items-center mb-3">
          <div className="w-16 h-12 bg-white/5 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
            {animations[mode]}
          </div>
          <div>
            <h4 className="text-brand-accent text-xs font-black uppercase tracking-widest">{labels[mode].title}</h4>
            <p className="text-[10px] text-white/70 font-medium leading-tight mt-0.5">{labels[mode].desc}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-white/5">
            <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Guided Mode Active</span>
            <button 
                onClick={onHide}
                className="text-[9px] font-black text-brand-accent uppercase tracking-widest hover:underline"
            >
                Hide
            </button>
        </div>
      </div>
    </div>
  );
};
