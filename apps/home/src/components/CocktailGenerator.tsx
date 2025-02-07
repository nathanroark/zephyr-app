import * as React from "react";
import { Check, ChevronsUpDown, Martini } from "lucide-react";
import { useCocktailQuery } from "../lib/queries";

import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const spirits = [
  { value: "vodka", label: "Vodka" },
  { value: "rum", label: "Rum" },
  { value: "tequila", label: "Tequila" },
  { value: "gin", label: "Gin" },
  { value: "whiskey", label: "Whiskey" },
];

export function CocktailGenerator() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [spirit, setSpirit] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");

  // Convert the comma-separated string to an array
  const ingredientsArray = ingredients
    .split(",")
    .map((ing) => ing.trim())
    .filter(Boolean);

  // Use our updated hook
  const { data, refetch, error } = useCocktailQuery(spirit, ingredientsArray);

  const [loading, setLoading] = React.useState(false);

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
    <div className="mx-auto py-3 md:py-6 space-y-8 w-full max-w-2xl">
      <div className="space-y-2">
        <div className="flex items-center justify-center mb-6">
          <Martini className="w-10 h-10 text-white" />

          <h2 className="text-3xl font-bold tracking-tight">AI Cocktail</h2>
        </div>

        <div className="flex items-center justify-center">
          <p className="text-muted-foreground">
            Select a spirit and add ingredients to generate a AI cocktail
            recipe.
          </p>
        </div>
      </div>
      <Separator />
      <div className="grid gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {value
                ? spirits.find((spirit) => spirit.value === value)?.label
                : "Select spirit..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search spirit..." />
              <CommandList>
                <CommandEmpty>No spirit found.</CommandEmpty>
                <CommandGroup>
                  {spirits.map((spirit) => (
                    <CommandItem
                      key={spirit.value}
                      value={spirit.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setSpirit(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${value === spirit.value ? "opacity-100" : "opacity-0"}`}
                      />
                      {spirit.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="ingredients">Additional ingredients</Label>
          <Input
            id="ingredients"
            placeholder="e.g. lime juice, sugar syrup"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <Button onClick={handleFetch} disabled={loading}>
          {loading ? "Generating..." : "Create Cocktail"}
        </Button>
      </div>
      {recipe && (
        <Card>
          <CardHeader>
            <CardTitle>{recipe.name}</CardTitle>
            <CardDescription>Your custom cocktail recipe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.ingredients.map((ingredient: any, index: number) => (
                    <li key={index}>
                      <span className="font-medium">{ingredient.name}</span>:{" "}
                      {ingredient.amount}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {recipe.instructions.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
