
import React from 'react';
import { Ball as BallType } from '../types';

interface BallProps {
  ball: BallType;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  isBeingDragged: boolean;
  animationSpeed: number;
  isPossessingPlayerDragged?: boolean;
  isVertical?: boolean;
}

export const Ball: React.FC<BallProps> = ({ ball, onMouseDown, isBeingDragged, animationSpeed, isPossessingPlayerDragged, isVertical = false }) => {
  const effectiveAnimationSpeed = (isBeingDragged || isPossessingPlayerDragged) ? 0 : animationSpeed;

  return (
    <div
      className="absolute w-[3%] aspect-square transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      style={{
        left: `${isVertical ? ball.position.y : ball.position.x}%`,
        top: `${isVertical ? ball.position.x : ball.position.y}%`,
        transition: `top ${effectiveAnimationSpeed}s ease-in-out, left ${effectiveAnimationSpeed}s ease-in-out`,
        filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))'
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDown(e, ball.id);
      }}
      title="Football"
    >
       <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ball-sheen" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.0" />
          </radialGradient>
          
          <linearGradient id="white-panel-grad" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#f5f5f5"/>
            <stop offset="100%" stopColor="#e0e0e0"/>
          </linearGradient>

          <linearGradient id="black-panel-grad" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#3d3d3d"/>
            <stop offset="100%" stopColor="#222222"/>
          </linearGradient>

          <clipPath id="ball-clip">
            <circle cx="100" cy="100" r="98" />
          </clipPath>
        </defs>
        
        <g clipPath="url(#ball-clip)">
          <circle cx="100" cy="100" r="98" fill="#ffffff" />
          
          <g stroke="#222" strokeWidth="2.5">
            <g fill="url(#white-panel-grad)">
              <polygon points="100,68 72,88 65,58 83,40 117,40 128,58" />
              <polygon points="128,88 128,58 155,50 168,80 150,105 117,122" />
              <polygon points="117,122 150,105 150,135 128,152 100,142 83,122" />
              <polygon points="83,122 50,105 50,135 72,152 100,142 117,122" />
              <polygon points="72,88 72,58 45,50 32,80 50,105 83,122" />
            </g>

            <g fill="url(#black-panel-grad)">
              <polygon points="100,68 128,88 117,122 83,122 72,88" />
              <path d="M 83,40 L 65,58 L 65,28 L 83,18 Z" />
              <path d="M 117,40 L 135,58 L 135,28 L 117,18 Z" />
              <path d="M 168,80 L 155,50 L 180,50 L 190,75 Z" />
              <path d="M 150,135 L 150,105 L 180,120 L 170,145 Z" />
              <path d="M 100,142 L 128,152 L 117,180 L 100,185 Z" />
              <path d="M 100,142 L 72,152 L 83,180 L 100,185 Z" />
              <path d="M 50,135 L 50,105 L 20,120 L 30,145 Z" />
              <path d="M 32,80 L 45,50 L 20,50 L 10,75 Z" />
            </g>
          </g>
        </g>
        
        <circle cx="100" cy="100" r="98" fill="url(#ball-sheen)" />
        
        <circle cx="100" cy="100" r="98" fill="none" stroke="#111" strokeWidth="2" />
      </svg>
    </div>
  );
};
