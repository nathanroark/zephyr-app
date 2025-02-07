// components/AiResponse.tsx

import { useState } from "react";
import { useCocktailQuery } from "../lib/queries";

interface Ingredient {
  name: string;
  amount: string;
}

export function AiResponse() {
  // Local state for user inputs
  const [selectedSpirit, setSelectedSpirit] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");

  // Convert the comma-separated string to an array
  const ingredientsArray = ingredientInput
    .split(",")
    .map((ing) => ing.trim())
    .filter(Boolean);

  // Use our updated hook
  const { data, refetch, isFetching, error } = useCocktailQuery(
    selectedSpirit,
    ingredientsArray,
  );

  const [loading, setLoading] = useState(false);

  // Prevent spamming the API by disabling the button briefly
  const handleFetch = async () => {
    if (loading) return;
    setLoading(true);
    await refetch(); // This will fetch from /api/cocktail with our query params
    setLoading(false);
  };

  // Handle errors
  if (error instanceof Error) {
    return (
      <div className="text-red-500 font-semibold mt-4">
        ⚠️ Error: {error.message}
      </div>
    );
  }

  // Extract the recipe object from the response
  const recipe = data?.recipe;

  return (
    <div className="h-full p-8 flex flex-col items-center justify-center">
      <div className="rounded-md p-4">
        <div className="text-center max-w-2xl space-y-4">
          {/* Spirit Selector */}
          <div>
            <label htmlFor="spirit-select" className="mr-2">
              Choose a spirit:
            </label>
            <select
              id="spirit-select"
              className="rounded px-2 py-1 bg-black text-white border border-neutral-300"
              value={selectedSpirit}
              onChange={(e) => setSelectedSpirit(e.target.value)}
            >
              <option value="">-- Any --</option>
              <option value="vodka">Vodka</option>
              <option value="rum">Rum</option>
              <option value="tequila">Tequila</option>
              <option value="gin">Gin</option>
              <option value="whiskey">Whiskey</option>
              {/* Add more spirits as desired */}
            </select>
          </div>

          {/* Additional Ingredients Input */}
          <div>
            <label htmlFor="ingredients-input" className="mr-2">
              Additional ingredients (comma-separated):
            </label>
            <input
              id="ingredients-input"
              type="text"
              className="rounded px-2 py-1 w-64 bg-black text-white border border-neutral-300"
              placeholder="e.g. lime juice, sugar syrup"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
            />
          </div>

          <button
            className={`px-4 py-2 bg-white text-black rounded-3xl hover:bg-neutral-200 border border-neutral-300 transition-colors mx-auto ${
              loading || isFetching ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleFetch}
            disabled={loading || isFetching}
          >
            {isFetching ? "Generating..." : "Create Cocktail"}
          </button>

          {/* If recipe data is loading, show nothing or a skeleton */}
          {isFetching && <div className="text-gray-400">Generating...</div>}

          {/* Once we have a recipe, display it */}
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
                  ),
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
