import styled from "styled-components";

const IngredientAnchor = styled.a`
  font-size: 17px;
  display: flex;
  width: 70%;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 10px;
  border-radius: 1rem;
  font-style: none;
`;

const IngredientName = styled.p`
  padding: 10px;
`;

const FlavourTag = styled.p`
  background-color: orange;
  border-radius: 1rem;
  padding: 10px;
`;
export function IngredientCard({ ingredient }) {
  const flavourLowerCase = ingredient.flavorProfile.toLowerCase();
  const colorString = `var(--${flavourLowerCase}-color)`;

  return (
    <IngredientAnchor href={`/${ingredient._id}`}>
      <IngredientName>{ingredient.name}</IngredientName>
      <FlavourTag style={{ backgroundColor: colorString }}>
        {ingredient.flavorProfile}
      </FlavourTag>
    </IngredientAnchor>
  );
}
