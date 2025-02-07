import * as React from "react";
import { Check, ChevronsUpDown, Martini } from "lucide-react";

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
  const [ingredients, setIngredients] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [recipe, setRecipe] = React.useState<any>(null);

  const handleGenerate = () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setRecipe({
        name: "Tropical Sunset",
        ingredients: [
          { name: "Rum", amount: "2 oz" },
          { name: "Pineapple juice", amount: "3 oz" },
          { name: "Coconut cream", amount: "1 oz" },
          { name: "Lime juice", amount: "0.5 oz" },
          { name: "Grenadine", amount: "0.5 oz" },
        ],
        instructions: [
          "Fill a shaker with ice.",
          "Add rum, pineapple juice, coconut cream, and lime juice to the shaker.",
          "Shake vigorously for 10-15 seconds.",
          "Strain into a tall glass filled with ice.",
          "Slowly pour grenadine over the back of a spoon to create a layered effect.",
          "Garnish with a pineapple wedge and a cherry.",
          "Serve and enjoy your Tropical Sunset!",
        ],
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-center mb-6">
          <Martini className="w-10 h-10 text-white" />

          <h2 className="text-3xl font-bold tracking-tight">
            Cocktail Generator
          </h2>
        </div>
        <p className="text-muted-foreground">
          Select a spirit and add ingredients to generate a custom cocktail
          recipe.
        </p>
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
        <Button onClick={handleGenerate} disabled={loading}>
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
