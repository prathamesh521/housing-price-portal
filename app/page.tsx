import Link from "next/link";
import { ArrowRight, BarChart3, Building2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
          Powered by Linear Regression
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Housing Price Portal
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          A unified platform to estimate property values and analyze housing
          market trends. Connect to your trained model, run predictions, compare
          properties, and review model performance metrics in one place.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/estimator"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 sm:w-auto"
          >
            <Building2 className="h-4 w-4" />
            Go to Property Estimator
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/analysis"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:w-auto"
          >
            <BarChart3 className="h-4 w-4" />
            Go to Market Analysis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Building2 className="h-8 w-8 text-emerald-600" />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Property Value Estimator
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Submit property details to get instant price predictions, track
            history, and compare multiple listings side by side.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <BarChart3 className="h-8 w-8 text-emerald-600" />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Market Analysis
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Review model accuracy metrics, feature coefficients, and understand
            what drives housing prices in your dataset.
          </p>
        </div>
      </section>
    </div>
  );
}
