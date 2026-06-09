export interface HouseFeatures {
  square_footage: number;
  bedrooms: number;
  bathrooms: number;
  year_built: number;
  lot_size: number;
  distance_to_city_center: number;
  school_rating: number;
}

export interface PredictionResponse {
  predicted_price: number;
}

export interface HealthResponse {
  status: string;
}

export interface ModelInfo {
  model_name: string;
  feature_names: string[];
  coefficients: Record<string, number>;
  intercept: number;
  r2_score: number;
  mae: number;
  rmse: number;
}

export interface PredictionHistoryEntry {
  id: string;
  timestamp: Date;
  features: HouseFeatures;
  predictedPrice: number;
}
