
export interface GemstoneAnalysis {
  identification: {
    primary: string;
    origin: string;
    confidence: number;
    features: string[];
    simulants: string[];
  };
  visualEvaluation: {
    color: string;
    clarity: string;
    cut: string;
  };
  valuation: {
    priceRange: string;
    factors: string;
  };
  recommendations: string[];
  warnings: string[];
}

export interface AnalysisState {
  loading: boolean;
  result: GemstoneAnalysis | null;
  error: string | null;
  image: string | null;
}
