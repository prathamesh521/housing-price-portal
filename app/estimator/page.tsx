"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";

import { ComparisonTable } from "@/components/ComparisonTable";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionHistory } from "@/components/PredictionHistory";
import { PredictionResult } from "@/components/PredictionResult";
import { getApiErrorMessage, predictPrice } from "@/lib/api";
import type { HouseFeatures, PredictionHistoryEntry } from "@/types/prediction";

export default function EstimatorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [history, setHistory] = useState<PredictionHistoryEntry[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selectedEntries = useMemo(
    () => history.filter((entry) => selectedIds.includes(entry.id)),
    [history, selectedIds]
  );

  const handlePredict = async (features: HouseFeatures) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await predictPrice(features);
      const entry: PredictionHistoryEntry = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        features,
        predictedPrice: response.predicted_price,
      };

      setCurrentPrice(response.predicted_price);
      setHistory((previous) => [entry, ...previous]);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Property Value Estimator
        </h1>
        <p className="mt-2 text-slate-600">
          Enter property features to receive an AI-powered price estimate from
          the FastAPI model.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <PredictionForm onSubmit={handlePredict} isLoading={isLoading} />
        {currentPrice !== null ? (
          <PredictionResult predictedPrice={currentPrice} />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              Your prediction result will appear here after submission.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-8">
        <PredictionHistory
          history={history}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        <ComparisonTable entries={selectedEntries} />
      </div>
    </div>
  );
}
