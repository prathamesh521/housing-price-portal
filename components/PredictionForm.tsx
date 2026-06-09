"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  houseFeaturesSchema,
  type HouseFeaturesFormValues,
} from "@/lib/validation";
import type { HouseFeatures } from "@/types/prediction";
import { formatFeatureLabel } from "@/lib/format";

interface PredictionFormProps {
  onSubmit: (features: HouseFeatures) => Promise<void>;
  isLoading: boolean;
}

const defaultValues: HouseFeaturesFormValues = {
  square_footage: 1800,
  bedrooms: 3,
  bathrooms: 2,
  year_built: 2001,
  lot_size: 7000,
  distance_to_city_center: 4.5,
  school_rating: 8.2,
};

const fieldKeys = Object.keys(defaultValues) as (keyof HouseFeaturesFormValues)[];

function FormField({
  label,
  name,
  register,
  error,
  step = "1",
}: {
  label: string;
  name: keyof HouseFeaturesFormValues;
  register: ReturnType<typeof useForm<HouseFeaturesFormValues>>["register"];
  error?: string;
  step?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        id={name}
        type="number"
        step={step}
        {...register(name, { valueAsNumber: true })}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HouseFeaturesFormValues>({
    resolver: zodResolver(houseFeaturesSchema),
    defaultValues,
  });

  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form
      onSubmit={handleFormSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-1 text-xl font-semibold text-slate-900">
        Property Details
      </h2>
      <p className="mb-6 text-sm text-slate-500">
        Enter property features to estimate market value.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {fieldKeys.map((key) => (
          <FormField
            key={key}
            name={key}
            label={formatFeatureLabel(key)}
            register={register}
            error={errors[key]?.message}
            step={key === "bedrooms" || key === "year_built" ? "1" : "0.1"}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Estimating..." : "Estimate Price"}
      </button>
    </form>
  );
}
