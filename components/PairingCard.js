import { getFlavorColor } from "@/utils/getFlavorColor";
import { useRouter } from "next/router";
import styled from "styled-components";

const CardWrapper = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: var(--card-background-color);
  border-radius: 1rem;
  padding: 20px;
`;

const IngredientsSection = styled.ul`
  padding: 7px 0 0 0;
  margin: 0;
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  gap: 10px;
`;

const IngredientName = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem;
  padding: 0;
  margin: 0;
`;

const FlavorsSection = styled.div`
  display: flex;
  gap: 15px;
`;

const FlavorTag = styled.a`
  border-radius: 1rem;
  padding: 10px;
`;

const ReasonSection = styled.div`
  padding: 0 10px 0 30px;
  line-height: 1.5;
`;

export default function PairingCard({
  pairing,
  ingredients,
  handleClickFlavor,
}) {
  const router = useRouter();
  if (!ingredients || !pairing) return <>Loading...</>;

  function findIngredient(id) {
    const foundIngredient = ingredients.find(
      (ingredient) => ingredient._id === id
    );
    return foundIngredient;
  }

  //   const specificIngredients = pairing.ingredients.map((id) => {
  //     return findIngredient(id);
  //   });

  const ingredient0 = findIngredient(pairing.ingredients[0]);
  const ingredient1 = findIngredient(pairing.ingredients[1]);
  const flavor0 = ingredient0.flavorProfile;
  const flavor1 = ingredient1.flavorProfile;
  const color0 = getFlavorColor(flavor0);
  const color1 = getFlavorColor(flavor1);

  //   function goToFilteredFlavors(flavor) {
  //     handleClickFlavor(flavor);
  //     router.push("/ingredients");
  //   }

  return (
    <CardWrapper>
      <IngredientsSection>
        <IngredientName href={`/${ingredient0._id}`}>
          {ingredient0.name}
        </IngredientName>
        <IngredientName>&</IngredientName>
        <IngredientName href={`/${ingredient1._id}`}>
          {ingredient1.name}
        </IngredientName>
      </IngredientsSection>
      <FlavorsSection>
        <FlavorTag
          style={{ backgroundColor: color0 }}
          onClick={handleClickFlavor(flavor0)}
        >
          {flavor0}{" "}
        </FlavorTag>
        <FlavorTag
          style={{ backgroundColor: color1 }}
          //   onClick={goToFilteredFlavors(flavor1)}
        >
          {flavor1}{" "}
        </FlavorTag>
      </FlavorsSection>
      <ReasonSection>{pairing.reason}</ReasonSection>
    </CardWrapper>
  );
}
