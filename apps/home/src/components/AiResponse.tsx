import { useCocktailQuery } from "../libs/queries";
import { useState } from "react";

interface Ingredient {
  name: string;
  amount: string;
}

export function AiResponse() {
  const { data, refetch, isFetching, error } = useCocktailQuery();
  const [loading, setLoading] = useState(false);

  // Prevent spamming the API by disabling the button briefly
  const handleFetch = async () => {
    if (loading) return;
    setLoading(true);
    await refetch();
    setLoading(false);
  };

  // Handle errors
  if (error) {
    return (
      <div className="text-red-500 font-semibold mt-4">
        ⚠️ Error: {error.message}
      </div>
    );
  }

  // Handle missing or invalid data
  const recipe = data?.recipe;
  if (!recipe) {
    return (
      <div className="h-full p-8 flex flex-col items-center justify-center">
        <div className="rounded-md p-4">
          <div className="text-center max-w-2xl">
            <button
              className={`px-4 py-2 bg-white text-black rounded-3xl hover:bg-neutral-200 transition-colors mx-auto ${
                loading || isFetching ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleFetch}
              disabled={loading || isFetching}
            >
              {isFetching ? "Generating..." : "Create Cocktail"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 flex flex-col items-center justify-center">
      <div className="rounded-md p-4">
        <div className="text-center max-w-2xl">
          <button
            className={`px-4 py-2 bg-white text-black rounded-3xl hover:bg-neutral-200 transition-colors mx-auto ${
              loading || isFetching ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleFetch}
            disabled={loading || isFetching}
          >
            {isFetching ? "Generating..." : "Create Cocktail"}
          </button>

          {/* Show a skeleton loader while fetching */}
          {!isFetching && recipe && (
            <div className="border border-neutral-800 p-6 rounded-lg mt-4 shadow-lg text-left max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                {recipe.name}
              </h2>

              <h3 className="text-xl text-neutral-100 font-semibold mb-2">
                Ingredients
              </h3>
              <ul className="list-disc list-inside space-y-1 text-neutral-300 pl-4">
                {recipe.ingredients.map(
                  (ingredient: Ingredient, index: number) => (
                    <li key={index}>
                      <span className="font-semibold text-white">
                        {ingredient.name}
                      </span>
                      :<span> {ingredient.amount}</span>
                    </li>
                  )
                )}
              </ul>

              <h3 className="text-xl text-neutral-100 font-semibold mt-6 mb-2">
                Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-neutral-300 pl-4">
                {recipe.instructions.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
