import styled from "styled-components";

export function IngredientCard({ ingredient }) {
  const IngredientArticle = styled.article`
    font-size: 17px;
    display: flex;
    width: 70%;
    justify-content: space-between;
    background-color: lightgreen;
    padding: 0 10px;
    border-radius: 1rem;
  `;

  const IngredientName = styled.p`
    padding: 10px;
  `;

  const FlavourTag = styled.p`
    background-color: orange;
    border-radius: 1rem;
    padding: 10px;
  `;

  return (
    <IngredientArticle>
      <IngredientName>{ingredient.name}</IngredientName>
      <FlavourTag>{ingredient.flavorProfile}</FlavourTag>
    </IngredientArticle>
  );
}
