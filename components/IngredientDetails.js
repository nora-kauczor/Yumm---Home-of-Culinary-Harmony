export function IngredientDetails({ ingredient }) {
  // console.log("Logg aus Komponente:", ingredient);
  if (!ingredient) return <>Loading...</>;

  const flavorLowerCase = ingredient.flavorProfile.toLowerCase();
  const colorString = `var(--${flavorLowerCase}-color)`;
  return (
    <>
      <h1>{ingredient.name}</h1>
      <p style={{ backgroundColor: colorString }}>{ingredient.flavorProfile}</p>
      <Image></Image>
      <a href={"/ingredients"}>Back</a>
    </>
  );
}
