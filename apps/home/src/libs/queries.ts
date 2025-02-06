import { useQuery } from "@tanstack/react-query";

export const useCocktailQuery = () => {
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
