export function IngredientCard({ ingredient }) {
  console.log(ingredient);
  return (
    <article>
      <p>{ingredient.name}</p>
      <p>{ingredient.flavorProfile}</p>
    </article>
  );
}
