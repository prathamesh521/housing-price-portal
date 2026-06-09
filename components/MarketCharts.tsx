"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatFeatureLabel, formatNumber } from "@/lib/format";
import type { ModelInfo } from "@/types/prediction";

interface MarketChartsProps {
  modelInfo: ModelInfo;
}

interface CoefficientDatum {
  feature: string;
  label: string;
  value: number;
}

function CoefficientTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: CoefficientDatum }[];
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const datum = payload[0].payload;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-slate-900">{datum.label}</p>
      <p className="text-slate-600">{formatNumber(datum.value, 2)}</p>
    </div>
  );
}

export function MarketCharts({ modelInfo }: MarketChartsProps) {
  const chartData: CoefficientDatum[] = modelInfo.feature_names.map(
    (feature) => ({
      feature,
      label: formatFeatureLabel(feature),
      value: modelInfo.coefficients[feature] ?? 0,
    })
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold text-slate-900">
        Feature Coefficients
      </h2>
      <p className="mb-6 text-sm text-slate-500">
        Impact of each feature on the predicted housing price.
      </p>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 16, left: 8, bottom: 64 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              interval={0}
              height={72}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CoefficientTooltip />} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.feature}
                  fill={entry.value >= 0 ? "#059669" : "#dc2626"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">
          Feature Names
        </h3>
        <div className="flex flex-wrap gap-2">
          {modelInfo.feature_names.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {formatFeatureLabel(feature)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
