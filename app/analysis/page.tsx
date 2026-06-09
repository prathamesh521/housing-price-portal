import { AlertCircle } from "lucide-react";

import { MarketCharts } from "@/components/MarketCharts";
import { StatsCards } from "@/components/StatsCards";
import { getApiErrorMessage, getModelInfo } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AnalysisPage() {
  try {
    const modelInfo = await getModelInfo();

    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Market Analysis
          </h1>
          <p className="mt-2 text-slate-600">
            Model performance metrics and feature coefficient analysis from the
            trained housing price model.
          </p>
        </div>

        <div className="space-y-8">
          <StatsCards modelInfo={modelInfo} />
          <MarketCharts modelInfo={modelInfo} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Market Analysis
          </h1>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">Unable to load model information</p>
            <p className="mt-1">{getApiErrorMessage(error)}</p>
            <p className="mt-2 text-red-600">
              Ensure the FastAPI server is running at http://127.0.0.1:8000
            </p>
          </div>
        </div>
      </div>
    );
  }
}
