export function IngredientDetails({ ingredient }) {
  console.log("Logg aus Komponente:", ingredient);
  if (!ingredient) return <>Loading...</>;
  return (
    <>
      <h1>{ingredient.name}</h1>
      <p>{ingredient.flavourProfile}</p>
    </>
  );
}
