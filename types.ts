
export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  team: 'home' | 'away';
  number: number;
  role: string;
  position: Position;
  initialPosition: Position;
  name?: string;
}

export type Formation =
  | '4-4-2'
  | '4-3-3'
  | '3-5-2'
  | '3-4-3'
  | '4-2-3-1'
  | '4-5-1'
  | '5-4-1'
  | '5-3-2'
  | '4-1-4-1'
  | '3-6-1'
  | '4-3-3 False 9'
  | '3-4-3 Diamond'
  | '4-2-4'
  | '3-3-4'
  | '4-3-2-1'
  | '4-1-2-1-2'
  | '3-2-4-1'
  | '2-3-5'
  | 'WM'
  | '4-3-3 Holding'
  | '4-3-3 Flat'
  | '4-3-3 Attacking'
  | '3-5-2 Wide'
  | '3-5-2 Narrow';

export interface Team {
  name: string;
  primaryColor: string;
  defaultFormation: Formation;
}

export interface League {
  name: string;
  teams: Team[];
}

export enum InteractionMode {
  Move = 'move',
  Arrows = 'arrows',
  Path = 'path',
  Curve = 'curve',
  Draw = 'draw',
  Connect = 'connect',
  Eraser = 'eraser',
  Note = 'note',
  Shape = 'shape',
  Vector = 'vector'
}

interface DrawingBase {
  id: string;
  color: string;
  dashed?: boolean;
}

export interface Arrow extends DrawingBase {
  type: 'arrow';
  playerId: string;
  points: [Position, Position];
}

export interface CurveArrow extends DrawingBase {
  type: 'curve';
  points: [Position, Position, Position]; // Start, Control, End
}

export interface Freehand extends DrawingBase {
  type: 'freehand';
  points: Position[];
}

export interface Path extends DrawingBase {
  type: 'path';
  points: Position[];
}

export interface Connection extends DrawingBase {
  type: 'connection';
  playerIds: [string, string];
}

export interface PassTrace extends DrawingBase {
  type: 'passTrace';
  points: [Position, Position];
}

export interface MarkerShape extends DrawingBase {
  type: 'shape';
  shapeType: 'x' | 'circle' | 'box' | 'space';
  position: Position;
  size: number;
  isLocked?: boolean;
}

export type Drawing = Arrow | Freehand | Connection | PassTrace | CurveArrow | Path | MarkerShape;

export interface Note {
  id: string;
  text: string;
  position: Position;
  color: string;
}

export interface Ball {
  id: string;
  position: Position;
}

export interface PassAction {
  id: string;
  fromPlayerId: string;
  toPlayerId: string;
  fromPos: Position;
  toPos: Position;
}

export interface SavedTactic {
  id: string;
  name: string;
  players: Player[];
  homeColor: string;
  awayColor: string;
  homeFormation: Formation;
  awayFormation: Formation;
  drawings: Drawing[];
  notes?: Note[];
  selectedHomeTeam: string;
  selectedAwayTeam: string;
  ball?: Ball;
  passSequence?: PassAction[];
}

export interface CommunityTactic extends SavedTactic {
  author: string;
  description: string;
  date: string;
  likes: number;
  downloads: number;
  tags: string[];
}
