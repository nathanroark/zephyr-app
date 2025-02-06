import { useQuery } from "@tanstack/react-query";

export const useSimpleCocktailQuery = () => {
  // const url = "http://localhost:3003/api/cocktail";
  const url = "https://nextjs-ai-backend.vercel.app/api/cocktail/recipe";
  return useQuery({
    queryKey: ["cocktailRecipe"],
    queryFn: async () => {
      const res = await fetch(url);
      console.log(res);
      if (!res.ok) throw new Error("Failed to fetch cocktail recipe");
      return await res.json();
    },
    enabled: false,
  });
};

export function useCocktailQuery(spirit: string, ingredients: string[]) {
  // const baseUrl = "http://localhost:3003/";
  const baseUrl = "https://nextjs-ai-backend.vercel.app/";
  const url = baseUrl + "api/custom-cocktail/recipe?${params.toString()}";

  const params = new URLSearchParams();
  if (spirit) {
    params.append("spirit", spirit);
  }
  if (ingredients.length > 0) {
    params.append("ingredients", ingredients.join(","));
  }

  return useQuery({
    queryKey: ["customCocktailRecipe"],
    queryFn: async () => {
      const res = await fetch(url);
      console.log(res);
      if (!res.ok) throw new Error("Failed to fetch cocktail recipe");
      return await res.json();
    },
    enabled: false,
  });
}
