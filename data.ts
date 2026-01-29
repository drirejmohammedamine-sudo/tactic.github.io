import { League } from './types';

export const LEAGUES: League[] = [
  {
    name: 'Premier League',
    teams: [
      { name: 'Arsenal', primaryColor: '#EF0107', defaultFormation: '4-3-3' },
      { name: 'Chelsea', primaryColor: '#034694', defaultFormation: '3-5-2' },
      { name: 'Liverpool', primaryColor: '#C8102E', defaultFormation: '4-3-3' },
      { name: 'Manchester City', primaryColor: '#6CABDD', defaultFormation: '4-3-3' },
      { name: 'Manchester United', primaryColor: '#DA291C', defaultFormation: '4-2-3-1' },
      { name: 'Tottenham Hotspur', primaryColor: '#FFFFFF', defaultFormation: '4-2-3-1' },
    ],
  },
  {
    name: 'La Liga',
    teams: [
      { name: 'Atlético Madrid', primaryColor: '#CB3524', defaultFormation: '5-3-2' },
      { name: 'FC Barcelona', primaryColor: '#A50044', defaultFormation: '4-3-3' },
      { name: 'Real Madrid', primaryColor: '#FFFFFF', defaultFormation: '4-3-3' },
    ],
  },
  {
    name: 'International',
    teams: [
        { name: 'Brazil', primaryColor: '#F9DD00', defaultFormation: '4-2-3-1' },
        { name: 'Germany', primaryColor: '#000000', defaultFormation: '4-2-3-1' },
        { name: 'Argentina', primaryColor: '#75AADB', defaultFormation: '4-4-2' },
        { name: 'France', primaryColor: '#002395', defaultFormation: '4-3-3' },
    ]
  }
];
