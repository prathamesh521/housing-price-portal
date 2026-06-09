"use client";

import { formatCurrency, formatFeatureLabel } from "@/lib/format";
import type { PredictionHistoryEntry } from "@/types/prediction";

interface ComparisonTableProps {
  entries: PredictionHistoryEntry[];
}

const comparisonRows: {
  label: string;
  getValue: (entry: PredictionHistoryEntry) => string;
}[] = [
  {
    label: "Square Footage",
    getValue: (entry) => entry.features.square_footage.toLocaleString(),
  },
  {
    label: "Bedrooms",
    getValue: (entry) => String(entry.features.bedrooms),
  },
  {
    label: "Bathrooms",
    getValue: (entry) => String(entry.features.bathrooms),
  },
  {
    label: "Lot Size",
    getValue: (entry) => entry.features.lot_size.toLocaleString(),
  },
  {
    label: "Predicted Price",
    getValue: (entry) => formatCurrency(entry.predictedPrice),
  },
];

function propertyLabel(index: number): string {
  return `Property ${String.fromCharCode(65 + index)}`;
}

export function ComparisonTable({ entries }: ComparisonTableProps) {
  if (entries.length < 2) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-xl font-semibold text-slate-900">
        Comparison View
      </h2>
      <p className="mb-6 text-sm text-slate-500">
        Side-by-side comparison of selected properties.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 font-medium text-slate-500">Feature</th>
              {entries.map((entry, index) => (
                <th
                  key={entry.id}
                  className="px-4 py-3 font-semibold text-slate-900"
                >
                  {propertyLabel(index)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.label} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-600">
                  {row.label}
                </td>
                {entries.map((entry) => (
                  <td key={entry.id} className="px-4 py-3 text-slate-800">
                    {row.getValue(entry)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 font-medium text-slate-600">
                {formatFeatureLabel("year_built")}
              </td>
              {entries.map((entry) => (
                <td key={entry.id} className="px-4 py-3 text-slate-800">
                  {entry.features.year_built}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
