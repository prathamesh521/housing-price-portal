import { formatCurrency, formatNumber } from "@/lib/format";
import type { ModelInfo } from "@/types/prediction";

interface StatsCardsProps {
  modelInfo: ModelInfo;
}

interface StatItem {
  label: string;
  value: string;
}

function buildStatItems(modelInfo: ModelInfo): StatItem[] {
  return [
    { label: "Model Name", value: modelInfo.model_name },
    { label: "R² Score", value: formatNumber(modelInfo.r2_score, 4) },
    { label: "MAE", value: formatCurrency(modelInfo.mae) },
    { label: "RMSE", value: formatCurrency(modelInfo.rmse) },
    { label: "Intercept", value: formatNumber(modelInfo.intercept, 2) },
  ];
}

export function StatsCards({ modelInfo }: StatsCardsProps) {
  const stats = buildStatItems(modelInfo);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
