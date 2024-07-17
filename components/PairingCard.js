import { getFlavorColor } from "@/utils/getFlavorColor";
import styled from "styled-components";

const CardWrapper = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background-color: var(--card-background-color);
  border-radius: 1rem;
  padding: 20px;
`;

const IngredientsSection = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
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
  display: flex;
`;

export default function PairingCard({ pairing, ingredients }) {
  if (!ingredients || !pairing) return <>Loading...</>;

  function findIngredient(id) {
    const foundIngredient = ingredients.find(
      (ingredient) => ingredient._id === id
    );
    return foundIngredient;
  }

  const specificIngredients = pairing.ingredients.map((id) => {
    return findIngredient(id);
  });

  const color0 = getFlavorColor(specificIngredients[0].flavorProfile);
  const color1 = getFlavorColor(specificIngredients[1].flavorProfile);

  return (
    <CardWrapper>
      <IngredientsSection>
        <IngredientName href={`/${specificIngredients[0]._id}`}>
          {specificIngredients[0].name}
        </IngredientName>
        <line>🧡</line>
        <IngredientName href={`/${specificIngredients[1]._id}`}>
          {specificIngredients[1].name}
        </IngredientName>
      </IngredientsSection>
      <FlavorsSection>
        <FlavorTag style={{ backgroundColor: color0 }}>
          {specificIngredients[0].flavorProfile}{" "}
        </FlavorTag>
        <FlavorTag style={{ backgroundColor: color1 }}>
          {specificIngredients[1].flavorProfile}{" "}
        </FlavorTag>
      </FlavorsSection>
      <ReasonSection>{pairing.reason}</ReasonSection>
    </CardWrapper>
  );
}
