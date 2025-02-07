import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Martini } from "lucide-react";
import { AiResponse } from "./SimpleAiResponse";

export function CocktailMenu() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full  p-10 flex flex-col items-center justify-center">
        <div className="rounded-md p-4">
          <div className="text-center max-w-2xl">
            <div className="flex items-center justify-center mb-6">
              <Martini className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">ai Cocktails</h1>
            <div className="text-white">
              <AiResponse />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
