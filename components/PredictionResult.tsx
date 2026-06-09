"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { formatCurrency } from "@/lib/format";

interface PredictionResultProps {
  predictedPrice: number;
}

export function PredictionResult({ predictedPrice }: PredictionResultProps) {
  const chartData = [{ name: "Prediction", value: predictedPrice }];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold text-slate-900">
        Estimated Value
      </h2>
      <p className="mb-6 text-sm text-slate-500">
        Based on your property features and the trained model.
      </p>

      <div className="mb-6 h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide domain={[0, predictedPrice * 1.1]} />
            <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={28}>
              <Cell fill="#059669" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-emerald-50 px-6 py-5 text-center">
        <p className="text-sm font-medium text-emerald-700">Predicted Price</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-900">
          {formatCurrency(predictedPrice)}
        </p>
      </div>
    </div>
  );
}
