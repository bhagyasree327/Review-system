"use client";

type Props = {
  suggestions: string[];
  onSelect: (
    value: string,
  ) => void;
};

export default function AISuggestions({
  suggestions,
  onSelect,
}: Props) {
  return (
    <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">

      <p className="mb-3 text-sm font-semibold text-indigo-700">
        ✨ Smart Suggestions
      </p>

      <div className="flex flex-wrap gap-2">

        {suggestions.map(
          (item, index) => (
            <button
              key={index}
              onClick={() =>
                onSelect(item)
              }
              className="rounded-full border border-indigo-300 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-indigo-600 hover:text-white"
            >
              {item}
            </button>
          ),
        )}

      </div>
    </div>
  );
}