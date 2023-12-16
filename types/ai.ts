export interface AIRequest {
  country: string;
  category: string;
  activity: string[];
  totalResult: number;
  maxWords: number;
  hasPreviousUrls: boolean;
}
