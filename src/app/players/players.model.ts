export interface Player {
  Name: string;
  Price: number;
  Bet: number;
  'Profile Image': string;
  wins?: number;
  losses?: number;
  selected?: boolean;
}
