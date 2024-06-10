export function IngredientCard({ ingredient }) {
  return (
    <article>
      <p>{ingredient.name}</p>
      <p>{ingredient.flavorProfile}</p>
    </article>
  );
}
