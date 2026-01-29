
import React from 'react';
import { Formation, InteractionMode, SavedTactic, Player } from '../types';
import { ArrowIcon, DrawIcon, MoveIcon, UndoIcon, ClearIcon, LogoIcon, CloseIcon, SelectAllIcon, ShirtIcon, ConnectIcon, ChevronRightIcon, ResetIcon, HomeIcon, EraserIcon, CurveIcon, RewindIcon, TextIcon, ChevronLeftIcon, MarkerIcon, LockIcon, UnlockIcon } from './Icons';
import { FORMATION_OPTIONS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDesktopVisible: boolean;
  onDesktopToggle: () => void;
  activeBoard: 1 | 2;
  setActiveBoard: (board: 1 | 2) => void;
  interactionMode: InteractionMode;
  setInteractionMode: (mode: InteractionMode) => void;
  homeFormation: Formation;
  setHomeFormation: (formation: Formation) => void;
  awayFormation: Formation;
  setAwayFormation: (formation: Formation) => void;
  homeColor: string;
  setHomeColor: (color: string) => void;
  awayColor: string;
  setAwayColor: (color: string) => void;
  drawingColor: string;
  setDrawingColor: (color: string) => void;
  undoDrawing: () => void;
  clearDrawings: () => void;
  onResetTactic: () => void;
  selectedHomeTeam: string;
  onSelectHomeTeam: (teamName: string) => void;
  selectedAwayTeam: string;
  onSelectAwayTeam: (teamName: string) => void;
  savedTactics: SavedTactic[];
  onSaveTactic: () => void;
  onLoadTactic: (id: string) => void;
  onDeleteTactic: (id: string) => void;
  onSelectAll: () => void;
  onSelectHome: () => void;
  onSelectAway: () => void;
  onDeselectAll: () => void;
  onRenumberTeam: (team: 'home' | 'away') => void;
  players: Player[];
  onPlayerNameChange: (id: string, name: string) => void;
  onPlayerNumberChange: (id: string, number: number) => void;
  onGoHome: () => void;
  activeShapeType?: 'x' | 'circle' | 'box' | 'space';
  setActiveShapeType?: (t: 'x' | 'circle' | 'box' | 'space') => void;
  activeShapeSize?: number;
  setActiveShapeSize?: (s: number) => void;
  onToggleShapeLock?: () => void;
  selectedShapeLocked?: boolean;
  activeTeamTab: 'home' | 'away';
  setActiveTeamTab: (tab: 'home' | 'away') => void;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const teamPlayers = props.players
    .filter(p => p.team === props.activeTeamTab)
    .sort((a, b) => a.number - b.number);
    
  return (
    <>
      {/* Mobile Backdrop */}
      {props.isOpen && (
        <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[90] md:hidden transition-opacity duration-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onClose();
            }}
        />
      )}
      
      <aside className={`
        fixed inset-y-0 right-0 h-full w-[85%] sm:w-[360px] bg-brand-darker z-[100]
        transform transition-transform duration-300 ease-in-out shadow-2xl
        ${props.isOpen ? 'translate-x-0' : 'translate-x-full'}
        md:relative md:inset-auto md:translate-x-0
        md:transition-[width,opacity] md:ease-[cubic-bezier(0.16,1,0.3,1)] md:duration-700
        overflow-hidden
        ${props.isDesktopVisible ? 'md:w-[320px] lg:w-[360px] md:border-l md:border-brand-light' : 'md:w-0 md:opacity-0'}
      `}>
        <div className="w-full h-full flex flex-col">
          <div className="p-5 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto no-scrollbar h-full">
              <div className="flex justify-between items-center bg-brand-darker sticky top-0 z-10 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 bg-brand-accent rounded-full"></div>
                    <h2 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-brand-text">Tactic Setup</h2>
                  </div>
                  <div className="flex items-center gap-2">
                      <button className="hidden md:block text-brand-subtext hover:text-brand-text p-2 -m-2 transition-colors" onClick={props.onDesktopToggle}>
                          <ChevronRightIcon />
                      </button>
                      <button 
                        type="button"
                        className="p-2 md:hidden text-brand-subtext hover:text-red-500 bg-brand-light/20 rounded-full active:scale-90" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          props.onClose();
                        }} 
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          <CloseIcon />
                        </div>
                      </button>
                  </div>
              </div>
              
              <div className="p-1 bg-brand-light/30 rounded-lg grid grid-cols-2 gap-1 shadow-inner">
                  <button onClick={() => props.setActiveBoard(1)} className={`px-1 py-2 rounded-md text-[9px] font-black uppercase transition-colors ${props.activeBoard === 1 ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext'}`}>Board 1</button>
                  <button onClick={() => props.setActiveBoard(2)} className={`px-1 py-2 rounded-md text-[9px] font-black uppercase transition-colors ${props.activeBoard === 2 ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext'}`}>Board 2</button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                  <button onClick={props.onGoHome} className="flex flex-1 items-center justify-center gap-2 px-3 py-2.5 bg-white border border-brand-light rounded-xl text-[9px] font-black text-brand-subtext uppercase shadow-sm"><HomeIcon /><span>Home</span></button>
                  <button onClick={props.clearDrawings} className="flex flex-1 items-center justify-center gap-2 px-3 py-2.5 bg-white border border-red-50 rounded-xl text-[9px] font-black text-red-500 uppercase shadow-sm"><ClearIcon /><span>Clear</span></button>
              </div>

              <SidebarSection title="Roster Control">
                  <div className="flex gap-2 mb-3 p-1 bg-brand-light/20 rounded-lg">
                      <button onClick={() => props.setActiveTeamTab('home')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-md transition-all ${props.activeTeamTab === 'home' ? 'bg-white text-brand-text shadow-sm' : 'text-brand-subtext'}`}>Home</button>
                      <button onClick={() => props.setActiveTeamTab('away')} className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-md transition-all ${props.activeTeamTab === 'away' ? 'bg-white text-brand-text shadow-sm' : 'text-brand-subtext'}`}>Away</button>
                  </div>
                  <div className="space-y-2 max-h-52 sm:max-h-64 overflow-y-auto pr-1 no-scrollbar p-1 border border-brand-light/10 rounded-xl">
                      {teamPlayers.map(player => (
                          <div key={player.id} className="flex items-center gap-2 group">
                              <div className="w-10 flex-shrink-0">
                                  <input 
                                      type="number" 
                                      value={player.number} 
                                      onChange={(e) => props.onPlayerNumberChange(player.id, parseInt(e.target.value) || 0)}
                                      className="w-full bg-white border border-brand-light rounded-lg px-1 py-2 text-[10px] font-black text-center text-brand-text outline-none shadow-sm"
                                  />
                              </div>
                              <div className="flex-1">
                                  <input 
                                      type="text" 
                                      value={player.name || ''} 
                                      placeholder={player.role}
                                      onChange={(e) => props.onPlayerNameChange(player.id, e.target.value)}
                                      className="w-full bg-white border border-brand-light rounded-lg px-3 py-2 text-[10px] text-brand-text font-bold outline-none shadow-sm"
                                  />
                              </div>
                          </div>
                      ))}
                  </div>
              </SidebarSection>
              
              <SidebarSection title="Formations">
                  <div className="space-y-4">
                      <FormationSelect label="Home System" value={props.homeFormation} onChange={props.setHomeFormation} />
                      <FormationSelect label="Away System" value={props.awayFormation} onChange={props.setAwayFormation} />
                  </div>
              </SidebarSection>
              
              <SidebarSection title="Kit Color">
                  <div className="space-y-4">
                      <ColorSelector label="Home Kit" selectedColor={props.homeColor} onSelect={props.setHomeColor} />
                      <ColorSelector label="Away Kit" selectedColor={props.awayColor} onSelect={props.setAwayColor} />
                      <ColorSelector label="Drawing Color" selectedColor={props.drawingColor} onSelect={props.setDrawingColor} />
                  </div>
              </SidebarSection>
              
              <div className="h-12 sm:h-20" />
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-3 border-b border-brand-light pb-5 last:border-0">
    <h3 className="text-[9px] font-black uppercase tracking-widest text-brand-subtext">{title}</h3>
    {children}
  </div>
);

const FormationSelect: React.FC<{ label: string; value: Formation; onChange: (f: Formation) => void }> = ({ label, value, onChange }) => (
    <div className="flex-1">
        <label className="block text-[8px] font-black uppercase tracking-wider text-brand-subtext mb-1">{label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value as Formation)} className="w-full bg-brand-light/20 border border-brand-light rounded-lg p-2 text-[10px] font-bold text-brand-text outline-none cursor-pointer shadow-sm">
            {FORMATION_OPTIONS.map(group => (
                <optgroup key={group.category} label={group.category}>
                    {group.options.map(f => <option key={f} value={f}>{f}</option>)}
                </optgroup>
            ))}
        </select>
    </div>
);

const ColorSelector: React.FC<{ label: string, selectedColor: string, onSelect: (c: string) => void }> = ({ label, selectedColor, onSelect }) => (
    <div className="flex-1">
        <label className="block text-[8px] font-black uppercase tracking-wider text-brand-subtext mb-1">{label}</label>
        <div className="relative group">
             <input type="color" value={selectedColor} onChange={(e) => onSelect(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="w-full h-10 bg-brand-light/20 border border-brand-light rounded-lg flex items-center px-3 shadow-sm transition-all group-hover:border-brand-accent/50">
                <div className="w-4 h-4 rounded-md border border-white shadow-sm" style={{ backgroundColor: selectedColor }} />
                <span className="ml-2 text-[9px] font-mono uppercase font-black text-brand-text">{selectedColor}</span>
            </div>
        </div>
    </div>
);
