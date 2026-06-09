"use client";

import { formatCurrency, formatTimestamp } from "@/lib/format";
import type { PredictionHistoryEntry } from "@/types/prediction";

interface PredictionHistoryProps {
  history: PredictionHistoryEntry[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function PredictionHistory({
  history,
  selectedIds,
  onSelectionChange,
}: PredictionHistoryProps) {
  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((entryId) => entryId !== id));
      return;
    }

    onSelectionChange([...selectedIds, id]);
  };

  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">
          No predictions yet. Submit a property to start building history.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Prediction History
          </h2>
          <p className="text-sm text-slate-500">
            Select entries to compare side by side.
          </p>
        </div>
        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={() => onSelectionChange([])}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            Clear selection
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="px-3 py-3 font-medium">Compare</th>
              <th className="px-3 py-3 font-medium">Timestamp</th>
              <th className="px-3 py-3 font-medium">Square Footage</th>
              <th className="px-3 py-3 font-medium">Bedrooms</th>
              <th className="px-3 py-3 font-medium">Bathrooms</th>
              <th className="px-3 py-3 font-medium">Predicted Price</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => {
              const isSelected = selectedIds.includes(entry.id);

              return (
                <tr
                  key={entry.id}
                  className={`border-b border-slate-100 transition-colors ${
                    isSelected ? "bg-emerald-50/60" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelection(entry.id)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      aria-label={`Select prediction from ${formatTimestamp(entry.timestamp)}`}
                    />
                  </td>
                  <td className="px-3 py-3 text-slate-700">
                    {formatTimestamp(entry.timestamp)}
                  </td>
                  <td className="px-3 py-3 text-slate-700">
                    {entry.features.square_footage.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 text-slate-700">
                    {entry.features.bedrooms}
                  </td>
                  <td className="px-3 py-3 text-slate-700">
                    {entry.features.bathrooms}
                  </td>
                  <td className="px-3 py-3 font-medium text-slate-900">
                    {formatCurrency(entry.predictedPrice)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
