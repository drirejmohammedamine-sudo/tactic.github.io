
import React, { useState, useRef, useEffect } from 'react';
import { Player as PlayerType, InteractionMode } from '../types';

interface PlayerProps {
  player: PlayerType;
  color: string;
  onNumberChange?: (id: string, newNumber: number) => void;
  onNameChange?: (id: string, newName: string) => void;
  isSelected: boolean;
  onClick: (id: string) => void;
  animationSpeed: number;
  onMouseDownStart: (id: string) => void;
  isBeingDragged: boolean;
  isSource: boolean;
  onPassRequest?: (targetPlayerId: string) => void;
  isPossessionPlayer: boolean;
  otherPlayerHasPossession: boolean;
  onSendToBench?: (id: string) => void;
  interactionMode?: InteractionMode;
  showBenchAction?: boolean; // New prop to control visibility of bench button
  isVertical?: boolean;
}

// Helper to determine if a color is light or dark to set contrasting text color
const getTextColorForBackground = (hexColor: string): string => {
  if (!hexColor) return 'text-white';

  try {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // YIQ formula to determine brightness
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    
    return yiq >= 128 ? 'text-black' : 'text-white';
  } catch (error) {
    console.error("Invalid color format:", hexColor);
    return 'text-white'; // Default to white on error
  }
};


export const Player: React.FC<PlayerProps> = ({ 
    player, color, onNumberChange, onNameChange, isSelected, onClick, animationSpeed, 
    onMouseDownStart, isBeingDragged, isSource, onPassRequest, isPossessionPlayer, otherPlayerHasPossession,
    onSendToBench, interactionMode, showBenchAction = true, isVertical = false
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(player.name || '');
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [numberInput, setNumberInput] = useState(String(player.number));
  const numberInputRef = useRef<HTMLInputElement>(null);

  const playerRef = useRef<HTMLDivElement>(null);
  
  // Ref to track drag vs click distinction
  const dragStartPos = useRef<{x: number, y: number}>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isEditingName) setNameInput(player.name || '');
  }, [player.name, isEditingName]);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (!isEditingNumber) setNumberInput(String(player.number));
  }, [player.number, isEditingNumber]);

  useEffect(() => {
    if (isEditingNumber && numberInputRef.current) {
      numberInputRef.current.focus();
      numberInputRef.current.select();
    }
  }, [isEditingNumber]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Calculate distance moved
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If moved more than 5 pixels, treat as a drag and ignore the click
    if (distance > 5) {
        return;
    }

    onClick(player.id);
  };
  
  const handleMainDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (otherPlayerHasPossession && onPassRequest) {
      onPassRequest(player.id);
    } else {
      if (isEditingNumber) return;
      if (onNameChange) {
          setIsEditingName(true);
      }
    }
  };

  const handleNumberDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditingName) return;
    if (onNumberChange) {
        setIsEditingNumber(true);
    }
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const saveName = () => {
    if (onNameChange && nameInput.trim() !== (player.name || '')) {
      onNameChange(player.id, nameInput.trim());
    }
    setIsEditingName(false);
  };

  const handleNameInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') saveName();
    else if (e.key === 'Escape') {
      setNameInput(player.name || '');
      setIsEditingName(false);
    }
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberInput(e.target.value);
  };

  const saveNumber = () => {
    const newNumber = parseInt(numberInput, 10);
    if (onNumberChange && !isNaN(newNumber) && newNumber !== player.number) {
      onNumberChange(player.id, newNumber);
    } else {
      setNumberInput(String(player.number));
    }
    setIsEditingNumber(false);
  };

  const handleNumberInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') saveNumber();
    else if (e.key === 'Escape') {
      setNumberInput(String(player.number));
      setIsEditingNumber(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Record start position for drag detection
    dragStartPos.current = { x: e.clientX, y: e.clientY };

    // For drawing tools (Arrows, Path, Curve, Draw), we allow the event to bubble up to the Pitch
    // This allows the user to click "on" a player to start a line snapped to that player.
    const drawingModes = [InteractionMode.Arrows, InteractionMode.Path, InteractionMode.Curve, InteractionMode.Draw];
    if (!interactionMode || !drawingModes.includes(interactionMode)) {
        e.stopPropagation();
    }
    onMouseDownStart(player.id);
  };
  
  const textColorClass = getTextColorForBackground(color);
  const effectiveAnimationSpeed = isBeingDragged ? 0 : animationSpeed;

  return (
    <div
      ref={playerRef}
      className={`player-element absolute w-[6.5%] sm:w-[5.5%] md:w-[4.5%] lg:w-[4%] xl:w-[3.5%] aspect-square rounded-full grid place-items-center font-bold ${textColorClass} text-xs sm:text-sm lg:text-base shadow-xl border-2 border-white transform -translate-x-1/2 -translate-y-1/2 [text-shadow:0px_2px_4px_rgba(0,0,0,0.6)] cursor-pointer ${isSelected ? 'is-selected' : 'ring-1 ring-black/40'} ${isSource ? 'is-source' : ''} ${isPossessionPlayer ? 'has-ball' : ''}`}
      style={{
        left: `${isVertical ? player.position.y : player.position.x}%`,
        top: `${isVertical ? player.position.x : player.position.y}%`,
        backgroundColor: color,
        transition: `top ${effectiveAnimationSpeed}s ease-in-out, left ${effectiveAnimationSpeed}s ease-in-out, box-shadow 0.2s, transform 0.2s, filter 0.2s`,
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleMainDoubleClick}
      title={isEditingName ? '' : 'Double-click to add/edit name or pass'}
    >
      {isEditingNumber ? (
        <input
          ref={numberInputRef}
          type="number"
          value={numberInput}
          onChange={handleNumberInputChange}
          onBlur={saveNumber}
          onKeyDown={handleNumberInputKeyDown}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="w-full h-full text-center bg-transparent border-none outline-none p-0 appearance-none m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
          style={{ color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}
        />
      ) : (
        <span
          onDoubleClick={handleNumberDoubleClick}
          className="w-full h-full grid place-items-center"
          title="Double-click to edit number"
        >
          {player.number}
        </span>
      )}
      
      {/* Context Actions (When Selected) */}
      {isSelected && (
          <>
             {onSendToBench && showBenchAction && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSendToBench(player.id);
                    }}
                    className="absolute -top-6 -right-6 bg-brand-darker border border-brand-light text-brand-subtext hover:text-red-500 hover:border-red-500 p-1.5 rounded-full shadow-lg transition-all scale-90 hover:scale-110 z-50"
                    title="Move to Bench"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M19 12l-7 7-7-7"/>
                    </svg>
                </button>
             )}
          </>
      )}

      {isEditingName ? (
        <input
          ref={nameInputRef}
          type="text"
          value={nameInput}
          onChange={handleNameInputChange}
          onBlur={saveName}
          onKeyDown={handleNameInputKeyDown}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-semibold text-center text-white bg-black/80 px-2 py-0.5 rounded-md whitespace-nowrap shadow-md w-24 outline-none"
        />
      ) : (
        player.name && (
          <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-black/60 px-2 py-0.5 rounded-md whitespace-nowrap shadow-md">
            {player.name}
          </div>
        )
      )}
    </div>
  );
};
