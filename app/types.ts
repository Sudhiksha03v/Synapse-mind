// File: types.ts
export interface Category {
  name: string;
  confidence: number;
  explanation: string;
}

export interface AnalysisResult {
  categories: Category[];
  summary: string;
}