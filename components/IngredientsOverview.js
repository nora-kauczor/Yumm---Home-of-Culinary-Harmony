import { IngredientCard } from "./IngredientCard";

export function IngredientsOverview({ ingredients }) {
  return (
    <div>
      {ingredients.forEach((ingredient) => console.log(ingredient))}
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient._id} ingredient={ingredient} />
      ))}
      <p>hallo</p>
    </div>
  );
}
