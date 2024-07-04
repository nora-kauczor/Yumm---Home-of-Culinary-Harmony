import styled from "styled-components";

export function IngredientCard({ ingredient }) {
  const IngredientArticle = styled.article`
    display: flex;
    gap: 5px;
  `;

  const IngredientName = styled.p`
    padding: 5px;
  `;

  const FlavourTag = styled.p`
    background-color: orange;
    border-radius: 1.5rem;
    padding: 5px;
  `;

  return (
    <IngredientArticle>
      <IngredientName>{ingredient.name}</IngredientName>
      <FlavourTag>{ingredient.flavorProfile}</FlavourTag>
    </IngredientArticle>
  );
}
