
import React, { useRef, useState, useEffect } from 'react';
import { Player as PlayerType, Position, InteractionMode, Arrow, CurveArrow, Freehand, Drawing, Connection, Ball as BallType, PassTrace, Path, Note, MarkerShape } from '../types';
import { Player } from './Player';
import { Ball } from './Ball';

interface PitchProps {
  players: PlayerType[];
  homeColor: string;
  awayColor: string;
  interactionMode: InteractionMode;
  drawingColor: string;
  drawings: Drawing[];
  setDrawings: React.Dispatch<React.SetStateAction<Drawing[]>>;
  onPlayerNumberChange?: (id: string, newNumber: number) => void;
  onPlayerNameChange?: (id: string, newName: string) => void;
  selectedPlayerIds: string[];
  onPlayerSelect: (id: string) => void;
  onClearSelection: () => void;
  animationSpeed: number;
  onPlayerMove: (id: string, position: Position) => void;
  ball?: BallType;
  onBallMove?: (id: string, position: Position) => void;
  onPassRequest?: (targetPlayerId: string) => void;
  ballPossessionPlayerId?: string | null;
  lockedTeams?: string[]; // 'home' | 'away'
  isMovementLocked?: boolean;
  onRemoveDrawing?: (id: string) => void;
  onDropPlayer?: (e: React.DragEvent, rect: DOMRect) => void;
  onSendToBench?: (id: string) => void;
  onBallDrop?: (playerId: string) => void; 
  showBenchAction?: boolean; 
  notes?: Note[]; 
  onAddNote?: (note: Note) => void;
  onUpdateNote?: (id: string, text: string) => void;
  onRemoveNote?: (id: string) => void;
  onMoveNote?: (id: string, pos: Position) => void;
  onShapePlace?: (pos: Position, size?: number) => void;
  selectedShapeId?: string | null;
  onShapeSelect?: (id: string) => void;
  isVertical?: boolean;
}

const HIT_AREA_WIDTH = "4"; 

export const Pitch: React.FC<PitchProps> = ({
  players,
  homeColor,
  awayColor,
  interactionMode,
  drawingColor,
  drawings,
  setDrawings,
  onPlayerNumberChange,
  onPlayerNameChange,
  selectedPlayerIds,
  onPlayerSelect,
  onClearSelection,
  animationSpeed,
  onPlayerMove,
  ball,
  onBallMove,
  onPassRequest,
  ballPossessionPlayerId,
  lockedTeams = [],
  isMovementLocked = false,
  onRemoveDrawing,
  onDropPlayer,
  onSendToBench,
  onBallDrop,
  showBenchAction = true,
  notes = [],
  onAddNote,
  onUpdateNote,
  onRemoveNote,
  onMoveNote,
  onShapePlace,
  selectedShapeId,
  onShapeSelect,
  isVertical = false
}) => {
  const pitchRef = useRef<HTMLDivElement>(null);
  const [isDrawingFreehand, setIsDrawingFreehand] = useState(false);
  const [currentFreehand, setCurrentFreehand] = useState<Freehand | null>(null);
  const [draggedPlayerId, setDraggedPlayerId] = useState<string | null>(null);
  const [draggedShapeId, setDraggedShapeId] = useState<string | null>(null);
  
  const [draggedBallId, setDraggedBallId] = useState<string | null>(null);
  const [sourcePlayerId, setSourcePlayerId] = useState<string | null>(null);
  const [freeArrowStart, setFreeArrowStart] = useState<Position | null>(null);
  const [arrowPreviewEnd, setArrowPreviewEnd] = useState<Position | null>(null);
  const [isErasing, setIsErasing] = useState(false);
  
  const [activePathPoints, setActivePathPoints] = useState<Position[]>([]);
  const [pathPreviewPos, setPathPreviewPos] = useState<Position | null>(null);

  const [curveStart, setCurveStart] = useState<Position | null>(null);
  const [curveEnd, setCurveEnd] = useState<Position | null>(null);
  const [curveControl, setCurveControl] = useState<Position | null>(null);
  const [isBendingCurve, setIsBendingCurve] = useState(false);

  // Vector Creation State
  const [isCreatingVector, setIsCreatingVector] = useState(false);
  const [vectorStartPos, setVectorStartPos] = useState<Position | null>(null);
  const [vectorCurrentSize, setVectorCurrentSize] = useState(0);

  // The pitch ratio for distortion-free drawing (105m / 68m)
  const PITCH_RATIO = isVertical ? 68 / 105 : 105 / 68;

  const getRelativeCoords = (e: React.MouseEvent | MouseEvent): Position => {
    if (!pitchRef.current) return { x: 0, y: 0 };
    const rect = pitchRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // In vertical mode, mouse X controls field Y (width) and mouse Y controls field X (length)
    if (isVertical) {
      return { x: y, y: x };
    }
    return { x, y };
  };

  const getSnappedCoords = (e: React.MouseEvent | MouseEvent): Position => {
    const pos = getRelativeCoords(e);
    if (interactionMode === InteractionMode.Path || interactionMode === InteractionMode.Arrows) {
        let bestPos = pos;
        let minDist = 3.5; 
        players.forEach(p => {
            const playerWorldX = 5 + (p.position.x * 0.9);
            const playerWorldY = 5 + (p.position.y * 0.9);
            const dx = playerWorldX - pos.x;
            const dy = playerWorldY - pos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
                minDist = dist;
                bestPos = { x: playerWorldX, y: playerWorldY };
            }
        });
        return bestPos;
    }
    return pos;
  };

  const handlePlayerClick = (id: string) => {
    if (interactionMode === InteractionMode.Eraser) return; 
    if (interactionMode === InteractionMode.Curve) return; 
    if (interactionMode === InteractionMode.Path) return; 
    if (interactionMode === InteractionMode.Note) return;
    if (interactionMode === InteractionMode.Shape || interactionMode === InteractionMode.Vector) return;
    
    const player = players.find(p => p.id === id);
    if (player && lockedTeams.includes(player.team)) return;

    if (interactionMode === InteractionMode.Move && onPassRequest && ballPossessionPlayerId) {
        if (selectedPlayerIds.includes(ballPossessionPlayerId)) {
            if (id !== ballPossessionPlayerId) {
                onPassRequest(id);
                return; 
            }
        }
    }

    if (interactionMode === InteractionMode.Move) {
      onPlayerSelect(id);
    } else if (interactionMode === InteractionMode.Connect) {
      if (!sourcePlayerId) {
        setSourcePlayerId(id);
      } else if (sourcePlayerId !== id) {
        const newConnection: Connection = {
          id: Date.now().toString(),
          type: 'connection',
          color: drawingColor,
          playerIds: [sourcePlayerId, id],
        };
        setDrawings(prev => [...prev, newConnection]);
        setSourcePlayerId(null);
      } else {
        setSourcePlayerId(null); 
      }
    } else {
      onPlayerSelect(id);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    if (interactionMode === InteractionMode.Eraser) {
       setIsErasing(true);
       return;
    }

    if (interactionMode === InteractionMode.Connect) {
      setSourcePlayerId(null);
      return;
    }
    
    if (e.target === e.currentTarget) {
        onClearSelection();
    }
    
    if (interactionMode === InteractionMode.Note && onAddNote) {
        const pos = getRelativeCoords(e);
        const newNote: Note = {
            id: Date.now().toString(),
            text: '',
            position: pos,
            color: drawingColor
        };
        onAddNote(newNote);
        return;
    }

    if (interactionMode === InteractionMode.Vector) {
        setIsCreatingVector(true);
        setVectorStartPos(getRelativeCoords(e));
        setVectorCurrentSize(0);
        return;
    }

    if (interactionMode === InteractionMode.Shape && onShapePlace) {
        onShapePlace(getRelativeCoords(e));
        return;
    }

    if (interactionMode === InteractionMode.Draw) {
      setIsDrawingFreehand(true);
      const startPos = getRelativeCoords(e);
      const id = Date.now().toString();
      setCurrentFreehand({ id, type: 'freehand', color: drawingColor, points: [startPos] });
      return;
    }

    if (interactionMode === InteractionMode.Arrows) {
        // Only set ground start if we didn't just click a player (sourcePlayerId is set in Player's onMouseDown)
        const isPlayerClick = (e.target as HTMLElement).closest('.player-element');
        if (!isPlayerClick) {
            setFreeArrowStart(getRelativeCoords(e));
        }
        return;
    }

    if (interactionMode === InteractionMode.Path) {
        const currentPos = getSnappedCoords(e);
        if (activePathPoints.length === 0) {
            setActivePathPoints([currentPos]);
        } else {
            const lastPoint = activePathPoints[activePathPoints.length - 1];
            const dx = currentPos.x - lastPoint.x;
            const dy = currentPos.y - lastPoint.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 0.5) { 
                if (activePathPoints.length > 1) {
                    const newPath: Path = {
                        id: Date.now().toString(),
                        type: 'path',
                        points: activePathPoints,
                        color: drawingColor,
                        dashed: true 
                    };
                    setDrawings(prev => [...prev, newPath]);
                }
                setActivePathPoints([]);
                setPathPreviewPos(null);
            } else {
                setActivePathPoints(prev => [...prev, currentPos]);
            }
        }
        return;
    }

    if (interactionMode === InteractionMode.Curve) {
        if (isBendingCurve && curveStart && curveEnd && curveControl) {
            const newCurve: CurveArrow = {
                id: Date.now().toString(),
                type: 'curve',
                points: [curveStart, curveControl, curveEnd],
                color: drawingColor,
                dashed: true
            };
            setDrawings(prev => [...prev, newCurve]);
            setCurveStart(null);
            setCurveEnd(null);
            setCurveControl(null);
            setIsBendingCurve(false);
        } else {
            const start = getRelativeCoords(e);
            setCurveStart(start);
            setCurveEnd(start); 
            setCurveControl(null);
            setIsBendingCurve(false);
        }
    }
  };

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    const currentPos = getRelativeCoords(e);

    if (draggedPlayerId && interactionMode === InteractionMode.Move) {
      const fieldCoords = {
          x: (currentPos.x - 5) / 0.9,
          y: (currentPos.y - 5) / 0.9
      };
      onPlayerMove(draggedPlayerId, fieldCoords);
      return;
    }

    if (draggedShapeId) {
        setDrawings(prev => prev.map(d => 
            d.id === draggedShapeId && d.type === 'shape' 
            ? { ...d, position: currentPos } 
            : d
        ));
        return;
    }

    if (isCreatingVector && vectorStartPos) {
        const dx = currentPos.x - vectorStartPos.x;
        const dy = currentPos.y - vectorStartPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy) * 1.4; // Scaled for better interaction feel
        setVectorCurrentSize(dist);
        return;
    }
    
    if (draggedBallId && interactionMode === InteractionMode.Move && onBallMove && !ballPossessionPlayerId) {
        const fieldCoords = {
            x: (currentPos.x - 5) / 0.9,
            y: (currentPos.y - 5) / 0.9
        };
        onBallMove(draggedBallId, fieldCoords);
        return;
    }

    if (interactionMode === InteractionMode.Arrows && (sourcePlayerId || freeArrowStart)) {
        setArrowPreviewEnd(currentPos);
        return;
    }

    if (interactionMode === InteractionMode.Path && activePathPoints.length > 0) {
        setPathPreviewPos(getSnappedCoords(e));
        return;
    }

    if (interactionMode === InteractionMode.Curve) {
        if (isBendingCurve) {
             setCurveControl(currentPos);
        } else if (curveStart) {
             setCurveEnd(currentPos);
        }
        return;
    }

    if (!isDrawingFreehand || interactionMode !== InteractionMode.Draw || !currentFreehand) return;
    setCurrentFreehand({ ...currentFreehand, points: [...currentFreehand.points, currentPos] });
  };

  const handleMouseUp = (e: React.MouseEvent | MouseEvent) => {
    setIsErasing(false);

    if (draggedPlayerId) {
        setDraggedPlayerId(null);
    }

    if (draggedShapeId) {
        setDraggedShapeId(null);
    }

    if (isCreatingVector && vectorStartPos) {
        if (vectorCurrentSize > 2 && onShapePlace) {
            onShapePlace(vectorStartPos, vectorCurrentSize);
        }
        setIsCreatingVector(false);
        setVectorStartPos(null);
        setVectorCurrentSize(0);
        return;
    }
    
    if (draggedBallId) {
        if (onBallDrop && ball) {
             const dropPos = getRelativeCoords(e);
             let closestPlayerId: string | null = null;
             let minDistance = 3.5; 
             players.forEach(p => {
                 const playerWorldX = isVertical ? 5 + (p.position.y * 0.9) : 5 + (p.position.x * 0.9);
                 const playerWorldY = isVertical ? 5 + (p.position.x * 0.9) : 5 + (p.position.y * 0.9);
                 const checkX = isVertical ? dropPos.y : dropPos.x;
                 const checkY = isVertical ? dropPos.x : dropPos.y;
                 const dx = playerWorldX - checkX;
                 const dy = playerWorldY - checkY;
                 const dist = Math.sqrt(dx * dx + dy * dy);
                 if (dist < minDistance) {
                     minDistance = dist;
                     closestPlayerId = p.id;
                 }
             });
             if (closestPlayerId) {
                 onBallDrop(closestPlayerId);
             }
        }
        setDraggedBallId(null);
    }
    
    if (interactionMode === InteractionMode.Draw && isDrawingFreehand && currentFreehand) {
      if (currentFreehand.points.length > 1) {
        setDrawings(prev => [...prev, currentFreehand]);
      }
      setCurrentFreehand(null);
    }
    setIsDrawingFreehand(false);

    if (interactionMode === InteractionMode.Arrows && (sourcePlayerId || freeArrowStart) && arrowPreviewEnd) {
        let startPos: Position | null = null;
        if (sourcePlayerId) {
            const sourcePlayer = players.find(p => p.id === sourcePlayerId);
            if (sourcePlayer) {
                const playerWorldX = 5 + (sourcePlayer.position.x * 0.9);
                const playerWorldY = 5 + (sourcePlayer.position.y * 0.9);
                startPos = { x: playerWorldX, y: playerWorldY };
            }
        } else if (freeArrowStart) {
            startPos = freeArrowStart;
        }

        if (startPos) {
            const dx = startPos.x - arrowPreviewEnd.x;
            const dy = startPos.y - arrowPreviewEnd.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 2) { 
                const newArrow: Arrow = {
                    id: Date.now().toString(),
                    type: 'arrow',
                    color: drawingColor,
                    playerId: sourcePlayerId || 'ground',
                    points: [startPos, arrowPreviewEnd],
                    dashed: true,
                };
                setDrawings(prev => [...prev, newArrow]);
            }
        }
        setSourcePlayerId(null);
        setFreeArrowStart(null);
        setArrowPreviewEnd(null);
    }

    if (interactionMode === InteractionMode.Curve && !isBendingCurve && curveStart && curveEnd) {
        const dx = curveEnd.x - curveStart.x;
        const dy = curveEnd.y - curveStart.y;
        if (Math.sqrt(dx * dx + dy * dy) < 2) {
             setCurveStart(null);
             setCurveEnd(null);
        } else {
             setIsBendingCurve(true);
             setCurveControl({ x: (curveStart.x + curveEnd.x) / 2, y: (curveStart.y + curveEnd.y) / 2 });
        }
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handlePlayerMouseDownStart = (id: string) => {
    if (interactionMode === InteractionMode.Eraser) return;
    if (interactionMode === InteractionMode.Note) return;
    if (interactionMode === InteractionMode.Shape || interactionMode === InteractionMode.Vector) return;

    const player = players.find(p => p.id === id);
    if (player && lockedTeams.includes(player.team)) return;

    if (interactionMode === InteractionMode.Move) {
      if (isMovementLocked) return;
      setDraggedPlayerId(id);
    } else if (interactionMode === InteractionMode.Arrows) {
      if (player) {
        setSourcePlayerId(id);
        const playerWorldX = 5 + (player.position.x * 0.9);
        const playerWorldY = 5 + (player.position.y * 0.9);
        setArrowPreviewEnd({ x: playerWorldX, y: playerWorldY });
      }
    }
  };

  const handleEraserTrigger = (drawingId: string) => {
    if (interactionMode === InteractionMode.Eraser && onRemoveDrawing) {
      onRemoveDrawing(drawingId);
    }
  };

  const handleEraserMouseDown = (e: React.MouseEvent, id: string) => {
    if (interactionMode === InteractionMode.Eraser && onRemoveDrawing) {
      e.stopPropagation();
      onRemoveDrawing(id);
      setIsErasing(true); 
    }
  };

  const getShortenedEndPoint = (start: Position, end: Position, shortenPercent: number): Position => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return end;
    const t = Math.max(0, (length - shortenPercent) / length);
    return {
      x: start.x + dx * t,
      y: start.y + dy * t,
    };
  };
  
  const pitchLineColor = 'rgba(255, 255, 255, 0.8)';
  const pitchLineWidth = '2';
  
  const sourcePlayerForPreview = players.find(p => p.id === sourcePlayerId);
  const isPossessingPlayerDragged = !!(draggedPlayerId && draggedPlayerId === ballPossessionPlayerId);
  const isEraser = interactionMode === InteractionMode.Eraser;
  const isCurveMode = interactionMode === InteractionMode.Curve;
  const isPathMode = interactionMode === InteractionMode.Path;

  return (
    <div
      ref={pitchRef}
      className={`w-full h-full relative overflow-hidden select-none ${isEraser ? 'cursor-crosshair' : ''} ${isCurveMode || isPathMode ? 'cursor-cell' : ''} ${interactionMode === InteractionMode.Note ? 'cursor-text' : ''}`}
      style={{
        background: `
          repeating-linear-gradient(
            ${isVertical ? 'to bottom' : 'to right'},
            #2A843D,
            #2A843D 10%,
            #267837 10%,
            #267837 20%
          )
        `
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onContextMenu={handleContextMenu}
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={(e) => {
          if(onDropPlayer && pitchRef.current) {
             onDropPlayer(e, pitchRef.current.getBoundingClientRect());
          }
      }}
    >
      <div className="absolute inset-[5%] pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full z-0" viewBox={isVertical ? "0 0 680 1050" : "0 0 1050 680"} preserveAspectRatio="none">
            <rect x="0" y="0" width={isVertical ? 680 : 1050} height={isVertical ? 1050 : 680} fill="none" stroke={pitchLineColor} strokeWidth="4" />
            
            {/* Horizontal Orientation Markings */}
            {!isVertical && (
              <>
                <line x1="525" y1="0" x2="525" y2="680" stroke={pitchLineColor} strokeWidth={pitchLineWidth} />
                <circle cx="525" cy="340" r="91.5" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <circle cx="525" cy="340" r="4" fill={pitchLineColor} />
                <path d="M 20, 0 A 20, 20 0 0 1 0, 20" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 1030, 0 A 20, 20 0 0 0 1050, 20" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 0, 660 A 20, 20 0 0 0 20, 680" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 1050, 660 A 20, 20 0 0 1 1030, 680" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 0, 136 h 165 v 408 h -165" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 0, 248 h 55 v 184 h -55" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <circle cx="110" cy="340" r="3" fill={pitchLineColor} />
                <path d="M 165, 248 A 91.5, 91.5 0 0 1 165, 432" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 1050, 136 h -165 v 408 h 165" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 1050, 248 h -55 v 184 h 55" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <circle cx="940" cy="340" r="3" fill={pitchLineColor} />
                <path d="M 885, 248 A 91.5, 91.5 0 0 0 885, 432" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
              </>
            )}

            {/* Vertical Orientation Markings */}
            {isVertical && (
              <>
                <line x1="0" y1="525" x2="680" y2="525" stroke={pitchLineColor} strokeWidth={pitchLineWidth} />
                <circle cx="340" cy="525" r="91.5" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <circle cx="340" cy="525" r="4" fill={pitchLineColor} />
                {/* Corners */}
                <path d="M 0, 20 A 20, 20 0 0 0 20, 0" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 660, 0 A 20, 20 0 0 0 680, 20" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 0, 1030 A 20, 20 0 0 0 20, 1050" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 680, 1030 A 20, 20 0 0 1 660, 1050" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                {/* Penalty Areas */}
                <path d="M 136, 0 v 165 h 408 v -165" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 248, 0 v 55 h 184 v -55" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <circle cx="340" cy="110" r="3" fill={pitchLineColor} />
                <path d="M 248, 165 A 91.5, 91.5 0 0 0 432, 165" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 136, 1050 v -165 h 408 v 165" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <path d="M 248, 1050 v -55 h 184 v 55" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
                <circle cx="340" cy="940" r="3" fill={pitchLineColor} />
                <path d="M 248, 885 A 91.5, 91.5 0 0 1 432, 885" stroke={pitchLineColor} strokeWidth={pitchLineWidth} fill="none" />
              </>
            )}
        </svg>

        <div className="absolute inset-0 z-20 pointer-events-auto">
          {players.map((player) => (
            <Player
              key={player.id}
              player={player}
              color={player.team === 'home' ? homeColor : awayColor}
              onNumberChange={onPlayerNumberChange}
              onNameChange={onPlayerNameChange}
              isSelected={selectedPlayerIds.includes(player.id)}
              onClick={handlePlayerClick}
              animationSpeed={animationSpeed}
              onMouseDownStart={handlePlayerMouseDownStart}
              isBeingDragged={draggedPlayerId === player.id}
              isSource={sourcePlayerId === player.id}
              onPassRequest={onPassRequest}
              isPossessionPlayer={player.id === ballPossessionPlayerId}
              otherPlayerHasPossession={!!ballPossessionPlayerId && player.id !== ballPossessionPlayerId}
              onSendToBench={onSendToBench}
              interactionMode={interactionMode}
              showBenchAction={showBenchAction}
              isVertical={isVertical}
            />
          ))}
          
          {ball && onBallMove && (
            <Ball
              ball={ball}
              onMouseDown={(e, id) => {
                if (interactionMode === InteractionMode.Eraser) return;
                if (interactionMode === InteractionMode.Move) {
                  if (isMovementLocked) return;
                  setDraggedBallId(id);
                }
              }}
              isBeingDragged={draggedBallId === ball.id}
              animationSpeed={animationSpeed}
              isPossessingPlayerDragged={isPossessingPlayerDragged}
              isVertical={isVertical}
            />
          )}
        </div>
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="5" refY="1.75" orient="auto">
              <polygon points="0 0, 5 1.75, 0 3.5" fill="currentColor" />
            </marker>
            <marker id="arrowhead-pass" markerWidth="4" markerHeight="4" refX="4" refY="2" orient="auto">
              <polygon points="0 0, 4 2, 0 4" fill="#FBBF24" />
            </marker>
          </defs>
          
          {drawings.map(d => {
            if (d.type === 'shape') {
                const shape = d as MarkerShape;
                const { x, y } = shape.position;
                const size = shape.size;
                const isSelected = selectedShapeId === shape.id;
                
                // ASPECT RATIO COMPENSATION
                const halfSizeX = size / 2;
                const halfSizeY = (size / 2) * PITCH_RATIO;
                
                const strokeWidth = Math.max(0.8, shape.size * 0.22); 
                const isShapeBeingDragged = draggedShapeId === shape.id;
                const markerColor = shape.color || '#FFFFFF';
                
                const renderX = isVertical ? y : x;
                const renderY = isVertical ? x : y;
                const renderHalfX = isVertical ? halfSizeY : halfSizeX;
                const renderHalfY = isVertical ? halfSizeX : halfSizeY;
                const renderW = isVertical ? size * PITCH_RATIO : size;
                const renderH = isVertical ? size : size * PITCH_RATIO;
                
                return (
                    <g 
                      key={shape.id} 
                      className="pointer-events-auto" 
                      onMouseDown={(e) => {
                        if (interactionMode === InteractionMode.Eraser) {
                          handleEraserMouseDown(e, shape.id);
                        } else {
                          e.stopPropagation();
                          if (onShapeSelect) onShapeSelect(shape.id);
                          if (!shape.isLocked) {
                             setDraggedShapeId(shape.id);
                          }
                        }
                      }} 
                      onMouseEnter={() => isErasing && handleEraserTrigger(shape.id)}
                      style={{ 
                        transition: isShapeBeingDragged ? 'none' : 'all 0.1s ease-out',
                        filter: isSelected ? `drop-shadow(0 0 6px ${markerColor})` : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                        cursor: shape.isLocked ? (isEraser ? 'crosshair' : 'default') : 'move'
                      }}
                    >
                        {shape.shapeType === 'x' && (
                            <g stroke={markerColor} strokeWidth={strokeWidth} strokeLinecap="round">
                                <line x1={`${renderX - renderHalfX}%`} y1={`${renderY - renderHalfY}%`} x2={`${renderX + renderHalfX}%`} y2={`${renderY + renderHalfY}%`} />
                                <line x1={`${renderX + renderHalfX}%`} y1={`${renderY - renderHalfY}%`} x2={`${renderX - renderHalfX}%`} y2={`${renderY + renderHalfY}%`} />
                            </g>
                        )}
                        {shape.shapeType === 'circle' && (
                            <ellipse cx={`${renderX}%`} cy={`${renderY}%`} rx={`${renderHalfX}%`} ry={`${renderHalfY}%`} stroke={markerColor} strokeWidth={strokeWidth} fill="none" />
                        )}
                        {shape.shapeType === 'box' && (
                            <rect x={`${renderX - renderHalfX}%`} y={`${renderY - renderHalfY}%`} width={`${renderW}%`} height={`${renderH}%`} stroke={markerColor} strokeWidth={strokeWidth} fill="none" />
                        )}
                        {shape.shapeType === 'space' && (
                            <rect 
                              x={`${renderX - renderHalfX}%`} 
                              y={`${renderY - renderHalfY}%`} 
                              width={`${renderW}%`} 
                              height={`${renderH}%`} 
                              fill={markerColor} 
                              fillOpacity="0.2" 
                              stroke={markerColor} 
                              strokeWidth="0.2" 
                              strokeDasharray="0.5 0.5" 
                            />
                        )}
                        
                        {isSelected && shape.isLocked && (
                             <g transform={`translate(${renderX}, ${renderY - renderHalfY - 2})`}>
                                 <circle r="1.5" fill="black" fillOpacity="0.5" />
                                 <path d="M-0.6,-0.4 L0.6,-0.4 L0.6,0.5 L-0.6,0.5 Z M-0.4,-0.4 L-0.4,-0.8 A0.4,0.4 0 0 1 0.4,-0.8 L0.4,-0.4" stroke="white" strokeWidth="0.2" fill="none" />
                             </g>
                        )}

                        <rect x={`${renderX - renderHalfX}%`} y={`${renderY - renderHalfY}%`} width={`${renderW}%`} height={`${renderH}%`} fill="transparent" />
                    </g>
                );
            }
            if (d.type === 'connection') {
              const conn = d as Connection;
              const p1 = players.find(p => p.id === conn.playerIds[0]);
              const p2 = players.find(p => p.id === conn.playerIds[1]);
              if (!p1 || !p2) return null;
              
              const p1RenderX = isVertical ? 5 + (p1.position.y * 0.9) : 5 + (p1.position.x * 0.9);
              const p1RenderY = isVertical ? 5 + (p1.position.x * 0.9) : 5 + (p1.position.y * 0.9);
              const p2RenderX = isVertical ? 5 + (p2.position.y * 0.9) : 5 + (p2.position.x * 0.9);
              const p2RenderY = isVertical ? 5 + (p2.position.x * 0.9) : 5 + (p2.position.y * 0.9);

              return (
                  <g key={conn.id} className="pointer-events-auto" onMouseDown={(e) => handleEraserMouseDown(e, conn.id)} onMouseEnter={() => isErasing && handleEraserTrigger(conn.id)}>
                    <line x1={`${p1RenderX}%`} y1={`${p1RenderY}%`} x2={`${p2RenderX}%`} y2={`${p2RenderY}%`} stroke={conn.color} strokeWidth="0.3" strokeDasharray="0.5 0.5" />
                    <line x1={`${p1RenderX}%`} y1={`${p1RenderY}%`} x2={`${p2RenderX}%`} y2={`${p2RenderY}%`} stroke="transparent" strokeWidth={HIT_AREA_WIDTH} style={{ cursor: isEraser ? 'crosshair' : 'default' }} />
                  </g>
              );
            }
            if (d.type === 'passTrace') {
              const trace = d as PassTrace;
              const start = trace.points[0];
              const end = trace.points[1];
              const shortenedEnd = getShortenedEndPoint(start, end, 2.5);
              
              const p1X = isVertical ? start.y : start.x;
              const p1Y = isVertical ? start.x : start.y;
              const p2X = isVertical ? shortenedEnd.y : shortenedEnd.x;
              const p2Y = isVertical ? shortenedEnd.x : shortenedEnd.y;

              return (
                <g key={trace.id} className="pointer-events-auto" onMouseDown={(e) => handleEraserMouseDown(e, trace.id)} onMouseEnter={() => isErasing && handleEraserTrigger(trace.id)}>
                    <line x1={`${p1X}%`} y1={`${p1Y}%`} x2={`${p2X}%`} y2={`${p2Y}%`} stroke={trace.color} strokeWidth="0.4" strokeDasharray="0.6 0.4" markerEnd="url(#arrowhead-pass)" />
                    <line x1={`${p1X}%`} y1={`${p1Y}%`} x2={`${p2X}%`} y2={`${p2Y}%`} stroke="transparent" strokeWidth={HIT_AREA_WIDTH} style={{ cursor: isEraser ? 'crosshair' : 'default' }} />
                </g>
              );
            }
            if (d.type === 'arrow') {
              const arrow = d as Arrow;
              const p1X = isVertical ? arrow.points[0].y : arrow.points[0].x;
              const p1Y = isVertical ? arrow.points[0].x : arrow.points[0].y;
              const p2X = isVertical ? arrow.points[1].y : arrow.points[1].x;
              const p2Y = isVertical ? arrow.points[1].x : arrow.points[1].y;

              return (
                  <g key={arrow.id} className="pointer-events-auto" onMouseDown={(e) => handleEraserMouseDown(e, arrow.id)} onMouseEnter={() => isErasing && handleEraserTrigger(arrow.id)}>
                      <line x1={`${p1X}%`} y1={`${p1Y}%`} x2={`${p2X}%`} y2={`${p2Y}%`} stroke={arrow.color} strokeWidth="0.4" markerEnd="url(#arrowhead)" strokeDasharray={arrow.dashed ? "1 0.5" : undefined} style={{ color: arrow.color }} />
                      <line x1={`${p1X}%`} y1={`${p1Y}%`} x2={`${p2X}%`} y2={`${p2Y}%`} stroke="transparent" strokeWidth={HIT_AREA_WIDTH} style={{ cursor: isEraser ? 'crosshair' : 'default' }} />
                  </g>
              );
            }
            if (d.type === 'curve') {
              const curve = d as CurveArrow;
              const p1 = curve.points[0];
              const p2 = curve.points[1];
              const p3 = curve.points[2];
              
              const p1X = isVertical ? p1.y : p1.x;
              const p1Y = isVertical ? p1.x : p1.y;
              const p2X = isVertical ? p2.y : p2.x;
              const p2Y = isVertical ? p2.x : p2.y;
              const p3X = isVertical ? p3.y : p3.x;
              const p3Y = isVertical ? p3.x : p3.y;

              return (
                  <g key={curve.id} className="pointer-events-auto" onMouseDown={(e) => handleEraserMouseDown(e, curve.id)} onMouseEnter={() => isErasing && handleEraserTrigger(curve.id)}>
                      <path d={`M ${p1X} ${p1Y} Q ${p2X} ${p2Y} ${p3X} ${p3Y}`} stroke={curve.color} strokeWidth="0.4" fill="none" markerEnd="url(#arrowhead)" strokeDasharray={curve.dashed ? "1 0.5" : undefined} style={{ color: curve.color }} />
                      <path d={`M ${p1X} ${p1Y} Q ${p2X} ${p2Y} ${p3X} ${p3Y}`} stroke="transparent" strokeWidth={HIT_AREA_WIDTH} fill="none" style={{ cursor: isEraser ? 'crosshair' : 'default' }} />
                  </g>
              );
            }
            if (d.type === 'path') {
              const path = d as Path;
              const pointsStr = path.points.map(p => isVertical ? `${p.y},${p.x}` : `${p.x},${p.y}`).join(' ');
              return (
                  <g key={path.id} className="pointer-events-auto" onMouseDown={(e) => handleEraserMouseDown(e, path.id)} onMouseEnter={() => isErasing && handleEraserTrigger(path.id)}>
                     <polyline points={pointsStr} stroke={path.color} strokeWidth="0.4" fill="none" strokeDasharray={path.dashed ? "1 0.5" : undefined} markerEnd="url(#arrowhead)" style={{ color: path.color }} />
                     <polyline points={pointsStr} stroke="transparent" strokeWidth={HIT_AREA_WIDTH} fill="none" style={{ cursor: isEraser ? 'crosshair' : 'default' }} />
                  </g>
              );
            }
            if (d.type === 'freehand') {
              const line = d as Freehand;
              const pathStr = line.points.map(p => isVertical ? `${p.y} ${p.x}` : `${p.x} ${p.y}`).join(' L ');
              return (
                <g key={line.id} className="pointer-events-auto" onMouseDown={(e) => handleEraserMouseDown(e, line.id)} onMouseEnter={() => isErasing && handleEraserTrigger(line.id)}>
                    <path d={`M ${pathStr}`} stroke={line.color} strokeWidth="0.4" fill="none" />
                    {line.id !== 'preview' && <path d={`M ${pathStr}`} stroke="transparent" strokeWidth={HIT_AREA_WIDTH} fill="none" style={{ cursor: isEraser ? 'crosshair' : 'default' }} />}
                </g>
              );
            }
            return null;
          })}

          {currentFreehand && (
              <path d={`M ${currentFreehand.points.map(p => isVertical ? `${p.y} ${p.x}` : `${p.x} ${p.y}`).join(' L ')}`} stroke={currentFreehand.color} strokeWidth="0.4" fill="none" />
          )}

          {isCreatingVector && vectorStartPos && (
              <rect 
                x={`${(isVertical ? vectorStartPos.y : vectorStartPos.x) - (isVertical ? (vectorCurrentSize / 2) * PITCH_RATIO : vectorCurrentSize / 2)}%`} 
                y={`${(isVertical ? vectorStartPos.x : vectorStartPos.y) - (isVertical ? vectorCurrentSize / 2 : (vectorCurrentSize / 2) * PITCH_RATIO)}%`} 
                width={`${isVertical ? vectorCurrentSize * PITCH_RATIO : vectorCurrentSize}%`} 
                height={`${isVertical ? vectorCurrentSize : vectorCurrentSize * PITCH_RATIO}%`} 
                fill={drawingColor} 
                fillOpacity="0.15" 
                stroke={drawingColor} 
                strokeWidth="0.3" 
                strokeDasharray="1 1"
                style={{ pointerEvents: 'none' }}
              />
          )}

          {interactionMode === InteractionMode.Arrows && (sourcePlayerForPreview || freeArrowStart) && arrowPreviewEnd && (
              <line 
                x1={`${isVertical ? (sourcePlayerForPreview ? (5 + sourcePlayerForPreview.position.y * 0.9) : freeArrowStart!.y) : (sourcePlayerForPreview ? (5 + sourcePlayerForPreview.position.x * 0.9) : freeArrowStart!.x)}%`} 
                y1={`${isVertical ? (sourcePlayerForPreview ? (5 + sourcePlayerForPreview.position.x * 0.9) : freeArrowStart!.x) : (sourcePlayerForPreview ? (5 + sourcePlayerForPreview.position.y * 0.9) : freeArrowStart!.y)}%`} 
                x2={`${isVertical ? arrowPreviewEnd.y : arrowPreviewEnd.x}%`} 
                y2={`${isVertical ? arrowPreviewEnd.x : arrowPreviewEnd.y}%`} 
                stroke={drawingColor} 
                strokeWidth="0.4" 
                markerEnd="url(#arrowhead)" 
                strokeDasharray="1 0.5" 
                style={{ color: drawingColor, opacity: 0.7 }} 
              />
          )}
          
          {interactionMode === InteractionMode.Curve && curveStart && curveEnd && (
              <path 
                d={isBendingCurve && curveControl 
                  ? `M ${isVertical ? curveStart.y : curveStart.x} ${isVertical ? curveStart.x : curveStart.y} Q ${isVertical ? curveControl.y : curveControl.x} ${isVertical ? curveControl.x : curveControl.y} ${isVertical ? curveEnd.y : curveEnd.x} ${isVertical ? curveEnd.x : curveEnd.y}` 
                  : `M ${isVertical ? curveStart.y : curveStart.x} ${isVertical ? curveStart.x : curveStart.y} L ${isVertical ? curveEnd.y : curveEnd.x} ${isVertical ? curveEnd.x : curveEnd.y}`} 
                stroke={drawingColor} 
                strokeWidth="0.4" 
                fill="none" 
                markerEnd="url(#arrowhead)" 
                strokeDasharray="1 0.5" 
                style={{ color: drawingColor, opacity: 0.8 }} 
              />
          )}
          
          {interactionMode === InteractionMode.Path && activePathPoints.length > 0 && pathPreviewPos && (
             <g>
               {activePathPoints.length > 1 && <polyline points={activePathPoints.map(p => isVertical ? `${p.y},${p.x}` : `${p.x},${p.y}`).join(' ')} stroke={drawingColor} strokeWidth="0.4" fill="none" strokeDasharray="1 0.5" style={{ opacity: 0.8 }} />}
               <line 
                x1={`${isVertical ? activePathPoints[activePathPoints.length-1].y : activePathPoints[activePathPoints.length-1].x}%`} 
                y1={`${isVertical ? activePathPoints[activePathPoints.length-1].x : activePathPoints[activePathPoints.length-1].y}%`} 
                x2={`${isVertical ? pathPreviewPos.y : pathPreviewPos.x}%`} 
                y2={`${isVertical ? pathPreviewPos.x : pathPreviewPos.y}%`} 
                stroke={drawingColor} 
                strokeWidth="0.4" 
                strokeDasharray="1 1" 
                markerEnd="url(#arrowhead)" 
                style={{ opacity: 0.6 }} 
               />
             </g>
          )}
        </svg>
      </div>
    </div>
  );
};
