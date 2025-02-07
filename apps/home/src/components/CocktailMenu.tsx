import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvider";
import { CocktailGenerator } from "./CocktailGenerator";

export function CocktailMenu() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="some-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div className="h-full  p-10 flex flex-col items-center justify-center">
          <div className="rounded-md p-4">
            <div className="text-white">
              <CocktailGenerator />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
