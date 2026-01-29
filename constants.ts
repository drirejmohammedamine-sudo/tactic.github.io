
import { Formation, Player, Position } from './types';

// Tactical Counter-Logic: Which formation best stops another?
export const FORMATION_COUNTERS: Record<Formation, Formation> = {
  '4-4-2': '3-5-2',        // Overload the midfield against two banks of four
  '4-3-3': '4-2-3-1',      // Zonal coverage to stop passing triangles
  '3-5-2': '4-3-3',        // Use wingers to exploit space behind wing-backs
  '3-4-3': '5-4-1',        // Low block to absorb wide pressure
  '4-2-3-1': '4-3-3 Holding', // Deep pivot to track the creative #10
  '4-5-1': '3-4-3',        // Aggressive wide play to stretch a flat five
  '5-4-1': '4-2-4',        // Maximum pressure to break a low block
  '5-3-2': '3-4-3 Diamond', // High pressure on central defenders
  '4-1-4-1': '4-3-3 False 9', // Pull the holding mid out of position
  '3-6-1': '4-4-2',        // Direct play to bypass a crowded midfield
  '4-3-3 False 9': '4-1-4-1', // Extra screen for the defense
  '3-4-3 Diamond': '4-5-1', // Pack the middle to stop the diamond
  '4-2-4': '5-4-1',        // Defensive stability against four strikers
  '3-3-4': '5-3-2',        // Solid back line with numbers in midfield
  '4-3-2-1': '3-5-2 Wide', // Stretch the narrow Christmas Tree
  '4-1-2-1-2': '4-3-3 Flat', // Use width to bypass the narrow diamond
  '3-2-4-1': '4-2-3-1',     // Balanced response to high-midfield system
  '2-3-5': '5-4-1',        // Extreme defense against extreme attack
  'WM': '4-3-3',           // Modern fluidity vs rigid historical system
  '4-3-3 Holding': '4-2-3-1', 
  '4-3-3 Flat': '4-3-3 Attacking',
  '4-3-3 Attacking': '4-1-4-1',
  '3-5-2 Wide': '4-4-2',
  '3-5-2 Narrow': '4-3-3'
};

export const TACTICAL_INSIGHTS: Record<string, { 
  summary: string, 
  strengths: string[], 
  weaknesses: string[], 
  style: string,
  ballSummary: string,
  ballStrengths: string[],
  ballWeaknesses: string[]
}> = {
  '4-4-2': {
    summary: 'The most classic structure in football. Highly disciplined and provides great coverage across the width of the pitch.',
    strengths: ['Strong defensive banks of four', 'Constant threat with two strikers', 'Clear roles and responsibilities'],
    weaknesses: ['Midfield can be outnumbered by 3-man systems', 'Predictable attacking patterns', 'Space between lines can be exploited'],
    style: 'Structured / Balanced',
    ballSummary: 'Focuses on direct play and wide crosses. The ball should move quickly to the wings to bypass central congestion.',
    ballStrengths: ['Dangerous 2v1 situations on wings', 'Simple vertical passing lanes', 'Direct service to two strikers'],
    ballWeaknesses: ['Difficulty maintaining central possession', 'Predictable long-ball transitions', 'Limited "between the lines" passing options']
  },
  '4-3-3': {
    summary: 'Optimized for possession and high pressing. The three-man midfield allows for superior ball circulation and control.',
    strengths: ['Excellent passing triangles', 'High attacking width from wingers', 'Effective high-pressing capability'],
    weaknesses: ['Exposed to counter-attacks on the wings', 'Requires high-stamina midfielders', 'Lone striker can be isolated'],
    style: 'Possession / Offensive',
    ballSummary: 'The gold standard for "Tiki-Taka". The ball stays on the ground, moving through the #6 to pull opponents out of position.',
    ballStrengths: ['Infinite passing triangles in midfield', 'High ball retention in the final third', 'Quick switches of play via the pivot'],
    ballWeaknesses: ['Vulnerable to ball loss in middle third', 'Over-passing without penetration', 'Wide areas exposed during ball transition']
  },
  '3-5-2': {
    summary: 'A flexible system that dominates the center of the pitch. Transitioning wing-backs are the engine of this formation.',
    strengths: ['Numerical superiority in midfield', 'Strong central defensive block (3 CBs)', 'Excellent for quick transitions'],
    weaknesses: ['Huge physical demand on wing-backs', 'Gaps behind wing-backs on counters', 'Requires ball-playing center-backs'],
    style: 'Dynamic / Midfield Dominant',
    ballSummary: 'Designed for central overloads. The ball moves through a 5-man engine room to isolate opposition full-backs.',
    ballStrengths: ['Domination of central ball-zones', 'Superiority in the second-ball phase', 'Wing-backs provide unmarked wide options'],
    ballWeaknesses: ['Crowded central areas hinder quick play', 'Risky passes back to the 3-man defense', 'Slow to move the ball to wide areas']
  },
  '4-2-3-1': {
    summary: 'The modern standard. Provides a solid defensive base with two holding players while allowing creative freedom for the No. 10.',
    strengths: ['Fluid attacking movement', 'Defensive security from "Double Pivot"', 'Versatile transitions'],
    weaknesses: ['Full-backs can be isolated 1v1', 'Heavy reliance on the creative "CAM"', 'Complex defensive rotations'],
    style: 'Fluid / Modern',
    ballSummary: 'Highly versatile in possession. Uses the double-pivot to bait the press before finding the creative #10.',
    ballStrengths: ['Multiple ball-exit routes from defense', 'Creative freedom in the #10 pockets', 'Safe ball-recycling via holding pair'],
    ballWeaknesses: ['Isolation of the lone striker', 'Ball circulation can become stagnant', 'Heavy dependency on pivot decision making']
  },
  '5-4-1': {
    summary: 'A "low-block" specialist. Prioritizes defensive solidity and waits for the perfect moment to counter-attack.',
    strengths: ['Extremely difficult to break down', 'Minimal space in the penalty area', 'Excellent for protecting a lead'],
    weaknesses: ['Very limited attacking support', 'Striker must be clinical with rare chances', 'Requires immense discipline'],
    style: 'Defensive / Counter',
    ballSummary: 'Pure counter-attacking logic. The ball is won deep and immediately launched to the lone striker or into space.',
    ballStrengths: ['High-efficiency vertical counters', 'Safe ball-exit to the corners', 'Reduced risk of central ball loss'],
    ballWeaknesses: ['Extremely low time on the ball', 'Striker is starved of support', 'Inability to build slow possession']
  },
  '3-4-3': {
    summary: 'An aggressive attacking system designed to pin opponents back. Ideal for teams with high-quality wingers and ball-playing defenders.',
    strengths: ['Overwhelming numbers in the final third', 'High defensive line pressure', 'Natural attacking width'],
    weaknesses: ['Significant gaps in the wide defensive areas', 'High risk of being caught in 2v3s', 'Vulnerable to fast wingers'],
    style: 'Aggressive / Width-focused',
    ballSummary: 'Aggressive wide possession. The ball is forced into wide channels to create 3v2 situations in the attacking third.',
    ballStrengths: ['Constant width in ball circulation', 'Overwhelming options in the box', 'High-speed ball transitions'],
    ballWeaknesses: ['Exposed wide channels on ball loss', 'Complexity in central passing lanes', 'Risky build-up with 3 at the back']
  },
  'Default': {
    summary: 'A versatile tactical setup adaptable to various game states. Focus on player movement and spatial awareness.',
    strengths: ['Balanced field coverage', 'Adaptable to opponent changes', 'Good foundation for set pieces'],
    weaknesses: ['Requires high tactical intelligence', 'Can become disorganized under pressure'],
    style: 'Tactical Flexibility',
    ballSummary: 'Focus on adaptive possession. The ball moves based on the specific movements of creative players.',
    ballStrengths: ['Unpredictable passing patterns', 'Adaptable ball speed', 'Fluid positioning'],
    ballWeaknesses: ['Lack of structured ball-exit routes', 'Confusion in ball-recovery zones']
  }
};

export const FORMATIONS: Record<Formation, { pos: Position; role: string }[]> = {
  '4-4-2': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 30, y: 20 }, role: 'LM' },
    { pos: { x: 30, y: 40 }, role: 'LCM' },
    { pos: { x: 30, y: 60 }, role: 'RCM' },
    { pos: { x: 30, y: 80 }, role: 'RM' },
    { pos: { x: 45, y: 40 }, role: 'ST' },
    { pos: { x: 45, y: 60 }, role: 'ST' },
  ],
  '4-3-3': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 30, y: 30 }, role: 'LCM' },
    { pos: { x: 30, y: 50 }, role: 'CM' },
    { pos: { x: 30, y: 70 }, role: 'RCM' },
    { pos: { x: 45, y: 25 }, role: 'LW' },
    { pos: { x: 48, y: 50 }, role: 'ST' },
    { pos: { x: 45, y: 75 }, role: 'RW' },
  ],
  '3-5-2': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 30 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 70 }, role: 'RCB' },
    { pos: { x: 30, y: 15 }, role: 'LWB' },
    { pos: { x: 30, y: 35 }, role: 'LCM' },
    { pos: { x: 30, y: 50 }, role: 'CDM' },
    { pos: { x: 30, y: 65 }, role: 'RCM' },
    { pos: { x: 30, y: 85 }, role: 'RWB' },
    { pos: { x: 45, y: 40 }, role: 'ST' },
    { pos: { x: 45, y: 60 }, role: 'ST' },
  ],
  '3-4-3': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 30 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 70 }, role: 'RCB' },
    { pos: { x: 30, y: 20 }, role: 'LM' },
    { pos: { x: 30, y: 40 }, role: 'LCM' },
    { pos: { x: 30, y: 60 }, role: 'RCM' },
    { pos: { x: 30, y: 80 }, role: 'RM' },
    { pos: { x: 45, y: 25 }, role: 'LW' },
    { pos: { x: 48, y: 50 }, role: 'ST' },
    { pos: { x: 45, y: 75 }, role: 'RW' },
  ],
  '4-2-3-1': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 28, y: 40 }, role: 'LDM' },
    { pos: { x: 28, y: 60 }, role: 'RDM' },
    { pos: { x: 40, y: 25 }, role: 'LAM' },
    { pos: { x: 42, y: 50 }, role: 'CAM' },
    { pos: { x: 40, y: 75 }, role: 'RAM' },
    { pos: { x: 50, y: 50 }, role: 'ST' },
  ],
  '4-5-1': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 30, y: 15 }, role: 'LM' },
    { pos: { x: 30, y: 35 }, role: 'LCM' },
    { pos: { x: 30, y: 50 }, role: 'CM' },
    { pos: { x: 30, y: 65 }, role: 'RCM' },
    { pos: { x: 30, y: 85 }, role: 'RM' },
    { pos: { x: 48, y: 50 }, role: 'ST' },
  ],
  '5-4-1': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 35 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 65 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 30, y: 20 }, role: 'LM' },
    { pos: { x: 30, y: 40 }, role: 'LCM' },
    { pos: { x: 30, y: 60 }, role: 'RCM' },
    { pos: { x: 30, y: 80 }, role: 'RM' },
    { pos: { x: 45, y: 50 }, role: 'ST' },
  ],
  '5-3-2': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 35 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 65 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 30, y: 30 }, role: 'LCM' },
    { pos: { x: 30, y: 50 }, role: 'CM' },
    { pos: { x: 30, y: 70 }, role: 'RCM' },
    { pos: { x: 45, y: 40 }, role: 'ST' },
    { pos: { x: 45, y: 60 }, role: 'ST' },
  ],
  '4-1-4-1': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 25, y: 50 }, role: 'CDM' },
    { pos: { x: 35, y: 20 }, role: 'LM' },
    { pos: { x: 35, y: 40 }, role: 'LCM' },
    { pos: { x: 35, y: 60 }, role: 'RCM' },
    { pos: { x: 35, y: 80 }, role: 'RM' },
    { pos: { x: 50, y: 50 }, role: 'ST' },
  ],
  '3-6-1': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 30 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 70 }, role: 'RCB' },
    { pos: { x: 28, y: 40 }, role: 'LDM' },
    { pos: { x: 28, y: 60 }, role: 'RDM' },
    { pos: { x: 40, y: 15 }, role: 'LM' },
    { pos: { x: 40, y: 35 }, role: 'LCM' },
    { pos: { x: 40, y: 65 }, role: 'RCM' },
    { pos: { x: 40, y: 85 }, role: 'RM' },
    { pos: { x: 50, y: 50 }, role: 'ST' },
  ],
  '4-3-3 False 9': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 30, y: 30 }, role: 'LCM' },
    { pos: { x: 30, y: 50 }, role: 'CM' },
    { pos: { x: 30, y: 70 }, role: 'RCM' },
    { pos: { x: 45, y: 25 }, role: 'LW' },
    { pos: { x: 38, y: 50 }, role: 'CF' },
    { pos: { x: 45, y: 75 }, role: 'RW' },
  ],
  '3-4-3 Diamond': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 30 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 70 }, role: 'RCB' },
    { pos: { x: 25, y: 50 }, role: 'CDM' },
    { pos: { x: 35, y: 20 }, role: 'LM' },
    { pos: { x: 35, y: 80 }, role: 'RM' },
    { pos: { x: 40, y: 50 }, role: 'CAM' },
    { pos: { x: 48, y: 25 }, role: 'LW' },
    { pos: { x: 52, y: 50 }, role: 'ST' },
    { pos: { x: 48, y: 75 }, role: 'RW' },
  ],
  '4-2-4': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 30, y: 40 }, role: 'LCM' },
    { pos: { x: 30, y: 60 }, role: 'RCM' },
    { pos: { x: 48, y: 20 }, role: 'LW' },
    { pos: { x: 50, y: 40 }, role: 'ST' },
    { pos: { x: 50, y: 60 }, role: 'ST' },
    { pos: { x: 48, y: 80 }, role: 'RW' },
  ],
  '3-3-4': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 30 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 70 }, role: 'RCB' },
    { pos: { x: 30, y: 30 }, role: 'LCM' },
    { pos: { x: 30, y: 50 }, role: 'CM' },
    { pos: { x: 30, y: 70 }, role: 'RCM' },
    { pos: { x: 48, y: 20 }, role: 'LW' },
    { pos: { x: 50, y: 40 }, role: 'ST' },
    { pos: { x: 50, y: 60 }, role: 'ST' },
    { pos: { x: 48, y: 80 }, role: 'RW' },
  ],
  '4-3-2-1': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 30, y: 30 }, role: 'LCM' },
    { pos: { x: 30, y: 50 }, role: 'CM' },
    { pos: { x: 30, y: 70 }, role: 'RCM' },
    { pos: { x: 42, y: 40 }, role: 'LAM' },
    { pos: { x: 42, y: 60 }, role: 'RAM' },
    { pos: { x: 50, y: 50 }, role: 'ST' },
  ],
  '4-1-2-1-2': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 25, y: 50 }, role: 'CDM' },
    { pos: { x: 32, y: 30 }, role: 'LCM' },
    { pos: { x: 32, y: 70 }, role: 'RCM' },
    { pos: { x: 40, y: 50 }, role: 'CAM' },
    { pos: { x: 48, y: 40 }, role: 'ST' },
    { pos: { x: 48, y: 60 }, role: 'ST' },
  ],
  '3-2-4-1': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 30 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 70 }, role: 'RCB' },
    { pos: { x: 28, y: 40 }, role: 'LDM' },
    { pos: { x: 28, y: 60 }, role: 'RDM' },
    { pos: { x: 40, y: 20 }, role: 'LW' },
    { pos: { x: 40, y: 40 }, role: 'LAM' },
    { pos: { x: 40, y: 60 }, role: 'RAM' },
    { pos: { x: 40, y: 80 }, role: 'RW' },
    { pos: { x: 50, y: 50 }, role: 'ST' },
  ],
  '2-3-5': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 30, y: 30 }, role: 'LCM' },
    { pos: { x: 30, y: 50 }, role: 'CM' },
    { pos: { x: 30, y: 70 }, role: 'RCM' },
    { pos: { x: 48, y: 15 }, role: 'LW' },
    { pos: { x: 50, y: 35 }, role: 'LF' },
    { pos: { x: 52, y: 50 }, role: 'ST' },
    { pos: { x: 50, y: 65 }, role: 'RF' },
    { pos: { x: 48, y: 85 }, role: 'RW' },
  ],
  'WM': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 30 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 70 }, role: 'RCB' },
    { pos: { x: 25, y: 40 }, role: 'LHB' },
    { pos: { x: 25, y: 60 }, role: 'RHB' },
    { pos: { x: 35, y: 40 }, role: 'LIF' },
    { pos: { x: 35, y: 60 }, role: 'RIF' },
    { pos: { x: 48, y: 20 }, role: 'LW' },
    { pos: { x: 50, y: 50 }, role: 'CF' },
    { pos: { x: 48, y: 80 }, role: 'RW' },
  ],
  '4-3-3 Holding': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 25, y: 50 }, role: 'CDM' },
    { pos: { x: 32, y: 35 }, role: 'LCM' },
    { pos: { x: 32, y: 65 }, role: 'RCM' },
    { pos: { x: 45, y: 25 }, role: 'LW' },
    { pos: { x: 48, y: 50 }, role: 'ST' },
    { pos: { x: 45, y: 75 }, role: 'RW' },
  ],
  '4-3-3 Flat': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 30, y: 30 }, role: 'LCM' },
    { pos: { x: 30, y: 50 }, role: 'CM' },
    { pos: { x: 30, y: 70 }, role: 'RCM' },
    { pos: { x: 48, y: 20 }, role: 'LW' },
    { pos: { x: 50, y: 50 }, role: 'ST' },
    { pos: { x: 48, y: 80 }, role: 'RW' },
  ],
  '4-3-3 Attacking': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 20 }, role: 'LB' },
    { pos: { x: 15, y: 40 }, role: 'LCB' },
    { pos: { x: 15, y: 60 }, role: 'RCB' },
    { pos: { x: 15, y: 80 }, role: 'RB' },
    { pos: { x: 28, y: 40 }, role: 'LCM' },
    { pos: { x: 28, y: 60 }, role: 'RCM' },
    { pos: { x: 40, y: 50 }, role: 'CAM' },
    { pos: { x: 48, y: 25 }, role: 'LW' },
    { pos: { x: 50, y: 50 }, role: 'ST' },
    { pos: { x: 48, y: 75 }, role: 'RW' },
  ],
  '3-5-2 Wide': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 30 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 70 }, role: 'RCB' },
    { pos: { x: 30, y: 15 }, role: 'LM' },
    { pos: { x: 28, y: 40 }, role: 'LCM' },
    { pos: { x: 28, y: 60 }, role: 'RCM' },
    { pos: { x: 30, y: 85 }, role: 'RM' },
    { pos: { x: 42, y: 50 }, role: 'CAM' },
    { pos: { x: 48, y: 40 }, role: 'ST' },
    { pos: { x: 48, y: 60 }, role: 'ST' },
  ],
  '3-5-2 Narrow': [
    { pos: { x: 5, y: 50 }, role: 'GK' },
    { pos: { x: 15, y: 30 }, role: 'LCB' },
    { pos: { x: 15, y: 50 }, role: 'CB' },
    { pos: { x: 15, y: 70 }, role: 'RCB' },
    { pos: { x: 25, y: 50 }, role: 'CDM' },
    { pos: { x: 32, y: 35 }, role: 'LCM' },
    { pos: { x: 32, y: 65 }, role: 'RCM' },
    { pos: { x: 40, y: 40 }, role: 'LAM' },
    { pos: { x: 40, y: 60 }, role: 'RAM' },
    { pos: { x: 48, y: 40 }, role: 'ST' },
    { pos: { x: 48, y: 60 }, role: 'ST' },
  ],
};

export const FORMATION_OPTIONS: { category: string; options: Formation[] }[] = [
  {
    category: 'Classic Formations',
    options: ['4-4-2', '4-3-3', '3-5-2', '3-4-3', '4-2-3-1', '4-5-1'],
  },
  {
    category: '🔹 Defensive Formations',
    options: ['5-4-1', '5-3-2', '4-1-4-1', '3-6-1'],
  },
  {
    category: '🔹 Attacking Formations',
    options: ['4-3-3 False 9', '3-4-3 Diamond', '4-2-4', '3-3-4'],
  },
  {
    category: '🔹 Modern / Hybrid Formations',
    options: ['4-3-2-1', '4-1-2-1-2', '3-2-4-1', '2-3-5', 'WM'],
  },
  {
    category: '🔹 Variations',
    options: ['4-3-3 Holding', '4-3-3 Flat', '4-3-3 Attacking', '3-5-2 Wide', '3-5-2 Narrow'],
  },
];

export const generatePlayers = (
  team: 'home' | 'away',
  formation: Formation
): Player[] => {
  const formationData = FORMATIONS[formation];
  return formationData.map((data, index) => {
    const position = team === 'home'
      ? data.pos
      : { x: 100 - data.pos.x, y: data.pos.y };
    return {
      id: `${team}-${data.role}-${index}`,
      team,
      number: index + 1,
      role: data.role,
      position,
      initialPosition: position,
    };
  });
};
