import { getFlavorColor } from "@/utils/getFlavorColor";
import * as Style from "./IngredientCard.style";

export function IngredientCard({
  ingredient,
  filterIngredients,
  deleteIngredient,
}) {
  const flavorColor = getFlavorColor(ingredient.flavorProfile);

  return (
    <Style.CardWrapper>
      <Style.IngredientName href={`/${ingredient._id}`}>
        {ingredient.name}
      </Style.IngredientName>
      <Style.FlavorTag
        style={{ backgroundColor: flavorColor }}
        onClick={() => filterIngredients(ingredient.flavorProfile)}
      >
        {ingredient.flavorProfile}
      </Style.FlavorTag>
      <Style.EditAnchor href={`/form/${ingredient._id}`}>Edit</Style.EditAnchor>
      <Style.DeleteButton
        type="button"
        onClick={() => deleteIngredient(ingredient)}
      >
        Delete
      </Style.DeleteButton>
    </Style.CardWrapper>
  );
}
