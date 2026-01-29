
import React, { useState } from 'react';
import { CommunityTactic, Player, InteractionMode } from '../types';
import { HeartIcon, UserIcon, CopyIcon, SearchIcon, ShareIcon, CloseIcon, CheckIcon, TrashIcon } from './Icons';
import { Pitch } from './Pitch';

interface CommunityPageProps {
  tactics: CommunityTactic[];
  onUseTactic: (tactic: CommunityTactic) => void;
  onLikeTactic: (id: string) => void;
  onCreateTactic: () => void;
  onDeleteTactic: (id: string) => void;
}

// A simplified read-only pitch for the card preview
const MiniPitch: React.FC<{ players: Player[], homeColor: string, awayColor: string }> = ({ players, homeColor, awayColor }) => (
    <div className="w-full h-full relative bg-[#2A843D] overflow-hidden">
        {/* Simple Lines */}
        <div className="absolute inset-0 border border-white/30 rounded-sm m-1"></div>
        <div className="absolute top-1/2 left-0 right-0 border-t border-white/30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/30 rounded-full"></div>
        
        {/* Players as dots */}
        {players.map(p => (
            <div 
                key={p.id}
                className="absolute w-2 h-2 rounded-full shadow-sm transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    left: `${p.position.x}%`,
                    top: `${p.position.y}%`,
                    backgroundColor: p.team === 'home' ? homeColor : awayColor,
                    border: '1px solid white'
                }}
            />
        ))}
    </div>
);

export const CommunityPage: React.FC<CommunityPageProps> = ({ tactics, onUseTactic, onLikeTactic, onCreateTactic, onDeleteTactic }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'latest' | 'top'>('latest');
    const [viewingTactic, setViewingTactic] = useState<CommunityTactic | null>(null);

    const filteredTactics = tactics
        .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.author.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (filter === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime();
            return b.likes - a.likes;
        });

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-brand-text mb-2">Tactical Community</h1>
                    <p className="text-brand-subtext">Discover, share, and analyze strategies from coaches worldwide.</p>
                </div>
                <button 
                    onClick={onCreateTactic}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-text font-bold rounded-lg hover:bg-white hover:shadow-lg transition-all"
                >
                    <ShareIcon />
                    <span>Share Your Tactic</span>
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-brand-darker p-4 rounded-xl border border-brand-light">
                <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-subtext"><SearchIcon /></div>
                    <input 
                        type="text" 
                        placeholder="Search tactics, authors, or formations..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-brand-light/50 border border-transparent rounded-lg focus:bg-white focus:border-brand-accent outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setFilter('latest')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'latest' ? 'bg-brand-text text-white' : 'bg-brand-light text-brand-subtext hover:bg-white'}`}
                    >
                        Latest
                    </button>
                    <button 
                        onClick={() => setFilter('top')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === 'top' ? 'bg-brand-text text-white' : 'bg-brand-light text-brand-subtext hover:bg-white'}`}
                    >
                        Top Rated
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTactics.map(tactic => (
                    <div 
                        key={tactic.id} 
                        onClick={() => setViewingTactic(tactic)}
                        className="bg-brand-darker rounded-xl border border-brand-light overflow-hidden hover:shadow-xl transition-shadow group flex flex-col cursor-pointer"
                    >
                        {/* Preview Header */}
                        <div className="h-40 relative border-b border-brand-light bg-gray-100 group-hover:opacity-90 transition-opacity">
                             <MiniPitch players={tactic.players} homeColor={tactic.homeColor} awayColor={tactic.awayColor} />
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                <span className="px-4 py-2 bg-white/90 rounded-full text-xs font-bold text-brand-text shadow-lg transform scale-95 group-hover:scale-100 transition-transform">View Details</span>
                             </div>
                             <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-mono">
                                 {tactic.homeFormation}
                             </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-brand-text line-clamp-1 group-hover:text-brand-accent transition-colors" title={tactic.name}>{tactic.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-brand-subtext shrink-0 bg-brand-light px-2 py-1 rounded-full">
                                    <span>Board {tactic.passSequence ? '2' : '1'}</span>
                                </div>
                            </div>
                            
                            <p className="text-sm text-brand-subtext line-clamp-2 mb-4 flex-1">{tactic.description}</p>
                            
                            <div className="flex items-center gap-2 text-xs text-brand-subtext mb-4 pb-4 border-b border-brand-light">
                                <UserIcon />
                                <span className="font-semibold">{tactic.author}</span>
                                <span className="mx-1">•</span>
                                <span>{new Date(tactic.date).toLocaleDateString()}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onLikeTactic(tactic.id); }}
                                        className="flex items-center gap-1.5 text-sm font-medium text-brand-subtext hover:text-red-500 transition-colors px-2 py-1 -ml-2 rounded-md hover:bg-brand-light/50"
                                    >
                                        <HeartIcon />
                                        <span>{tactic.likes}</span>
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDeleteTactic(tactic.id); }}
                                        className="p-2 text-brand-subtext hover:text-red-600 transition-colors bg-brand-light/30 rounded-md hover:bg-red-50"
                                        title="Delete Tactic"
                                    >
                                        <TrashIcon />
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onUseTactic(tactic); }}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-brand-light/50 text-brand-text text-sm font-semibold rounded-md hover:bg-brand-accent hover:text-brand-text transition-colors"
                                    >
                                        <CopyIcon />
                                        <span>Load</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTactics.length === 0 && (
                <div className="text-center py-20 text-brand-subtext">
                    <p className="text-lg">No tactics found matching your search.</p>
                    <button onClick={() => setSearchTerm('')} className="mt-4 text-brand-accent underline">Clear Search</button>
                </div>
            )}

            {/* PREVIEW MODAL */}
            {viewingTactic && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setViewingTactic(null)}>
                    <div className="bg-brand-darker w-full max-w-6xl max-h-[95vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
                        
                        {/* Main Stage (Board) */}
                        <div className="flex-1 bg-gray-900 p-4 flex flex-col items-center justify-center relative min-h-[400px]">
                            <div className="w-full aspect-[105/68] relative bg-[#2A843D] rounded-lg shadow-2xl border border-white/10 overflow-hidden">
                                <Pitch 
                                    players={viewingTactic.players}
                                    homeColor={viewingTactic.homeColor}
                                    awayColor={viewingTactic.awayColor}
                                    interactionMode={InteractionMode.Move}
                                    drawingColor="#fff"
                                    drawings={viewingTactic.drawings}
                                    setDrawings={() => {}}
                                    onPlayerNumberChange={() => {}}
                                    onPlayerNameChange={() => {}}
                                    selectedPlayerIds={[]}
                                    onPlayerSelect={() => {}}
                                    onClearSelection={() => {}}
                                    animationSpeed={0.5}
                                    onPlayerMove={() => {}}
                                    isMovementLocked={true}
                                    lockedTeams={['home', 'away']}
                                    ball={viewingTactic.ball}
                                />
                            </div>
                            <div className="absolute bottom-6 left-6 text-white/50 text-sm">Read-Only Preview</div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="w-full md:w-96 bg-brand-darker border-l border-brand-light flex flex-col">
                            <div className="p-6 border-b border-brand-light flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-brand-accent text-brand-text uppercase tracking-wider">
                                            {viewingTactic.homeFormation}
                                        </span>
                                        <span className="text-xs text-brand-subtext px-2 py-0.5 bg-brand-light rounded">
                                            Board {viewingTactic.passSequence ? '2' : '1'}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-brand-text leading-tight">{viewingTactic.name}</h2>
                                </div>
                                <button onClick={() => setViewingTactic(null)} className="text-brand-subtext hover:text-brand-text"><CloseIcon /></button>
                            </div>

                            <div className="p-6 flex-1 overflow-y-auto">
                                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-brand-light">
                                    <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center text-brand-subtext">
                                        <UserIcon />
                                    </div>
                                    <div>
                                        <div className="text-sm text-brand-subtext">Created by</div>
                                        <div className="font-bold text-brand-text">{viewingTactic.author}</div>
                                    </div>
                                </div>

                                <h3 className="font-bold text-brand-text mb-2">Tactical Breakdown</h3>
                                <p className="text-brand-subtext whitespace-pre-wrap leading-relaxed text-sm mb-6">
                                    {viewingTactic.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-brand-light/30 p-3 rounded-lg">
                                        <div className="text-xs text-brand-subtext uppercase font-bold mb-1">Likes</div>
                                        <div className="text-lg font-bold text-brand-text flex items-center gap-2">
                                            <HeartIcon /> {viewingTactic.likes}
                                        </div>
                                    </div>
                                    <div className="bg-brand-light/30 p-3 rounded-lg">
                                        <div className="text-xs text-brand-subtext uppercase font-bold mb-1">Downloads</div>
                                        <div className="text-lg font-bold text-brand-text flex items-center gap-2">
                                            <CheckIcon /> {viewingTactic.downloads}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-brand-light bg-brand-darker space-y-3">
                                <button 
                                    onClick={() => onUseTactic(viewingTactic)}
                                    className="w-full py-3 bg-brand-accent text-brand-text font-bold rounded-xl shadow-lg hover:bg-white hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    <CopyIcon />
                                    <span>Load to Board</span>
                                </button>
                                
                                <button
                                    onClick={() => { onDeleteTactic(viewingTactic.id); setViewingTactic(null); }}
                                    className="w-full py-3 bg-transparent border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <TrashIcon />
                                    <span>Delete Tactic</span>
                                </button>
                                
                                <p className="text-center text-xs text-brand-subtext mt-1">
                                    Loading this tactic will overwrite your current board.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
