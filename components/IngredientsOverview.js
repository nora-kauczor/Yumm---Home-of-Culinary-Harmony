import { ingredients } from "@/lib/ingredients";
import { IngredientCard } from "./IngredientCard";
import { useId } from "react";

export function IngredientsOverview() {
  return ingredients.map((ingredient) => (
    <IngredientCard key={uid()} ingredient={ingredient} />
  ));
}
