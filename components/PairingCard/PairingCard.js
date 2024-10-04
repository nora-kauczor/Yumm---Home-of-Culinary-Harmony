import { getFlavorColor } from "@/utils/getFlavorColor";
import { useRouter } from "next/router";
import * as Style from "./PairingCard.style";

export default function PairingCard({
  pairing,
  ingredients,
  filterIngredients,
}) {
  const router = useRouter();

  if (!ingredients || !pairing) return <>Loading...</>;

  function goToFilteredIngredients(flavor) {
    filterIngredients(flavor);
    router.push("/ingredients");
  }

  function findIngredientById(id) {
    const foundIngredient = ingredients.find(
      (ingredient) => ingredient._id === id
    );
    return foundIngredient;
  }

  const ingredient0 = findIngredientById(pairing.ingredients[0]);
  const ingredient1 = findIngredientById(pairing.ingredients[1]);
  const flavor0 = ingredient0.flavorProfile;
  const flavor1 = ingredient1.flavorProfile;
  const color0 = getFlavorColor(flavor0);
  const color1 = getFlavorColor(flavor1);

  return (
    <Style.CardWrapper>
      <Style.IngredientsSection>
        {ingredient0 && (
          <Style.IngredientName href={`/${ingredient0._id}`}>
            {ingredient0.name}
          </Style.IngredientName>
        )}
        <Style.IngredientName>&</Style.IngredientName>
        {ingredient1 && (
          <Style.IngredientName href={`/${ingredient1._id}`}>
            {ingredient1.name}
          </Style.IngredientName>
        )}
      </Style.IngredientsSection>
      <Style.FlavorsSection>
        {ingredient0 && (
          <Style.FlavorTag
            style={{
              backgroundColor: color0,
            }}
            onClick={() => goToFilteredIngredients(flavor0)}
          >
            {flavor0}{" "}
          </Style.FlavorTag>
        )}
        {ingredient1 && (
          <Style.FlavorTag
            style={{
              backgroundColor: color1,
            }}
            onClick={() => goToFilteredIngredients(flavor1)}
          >
            {flavor1}{" "}
          </Style.FlavorTag>
        )}
      </Style.FlavorsSection>
      <Style.ReasonSection>{pairing.reason}</Style.ReasonSection>
    </Style.CardWrapper>
  );
}
