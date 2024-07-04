import styled from "styled-components";
import { IngredientCard } from "./IngredientCard";

const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export function IngredientsOverview({ ingredients }) {
  return (
    <IngredientList>
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient._id} ingredient={ingredient} />
      ))}
    </IngredientList>
  );
}
