import styled from "styled-components";

export function IngredientCard({ ingredient }) {
  const IngredientArticle = styled.article`
    font-size: 20px;
    display: flex;
    width: 70%;
    justify-content: space-between;
    background-color: lightgreen;
    padding: 10px;
  `;

  const IngredientName = styled.p`
    padding: 10px;
  `;

  const FlavourTag = styled.p`
    background-color: orange;
    border-radius: 1.5rem;
    padding: 10px;
  `;

  return (
    <IngredientArticle>
      <IngredientName>{ingredient.name}</IngredientName>
      <FlavourTag>{ingredient.flavorProfile}</FlavourTag>
    </IngredientArticle>
  );
}
