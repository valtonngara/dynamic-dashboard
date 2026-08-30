export interface AnalyticsRecord {
  id: number;

  date: string;

  name: string;
  email: string;
  country: string;

  sales: number;
  activeUsers: number;
  sessions: number;
  engagements: number;
}