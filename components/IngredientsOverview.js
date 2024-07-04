import styled from "styled-components";
import { IngredientCard } from "./IngredientCard";

const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 1rem;
`;

export function IngredientsOverview({ ingredients }) {
  return (
    <IngredientList>
      {ingredients.forEach((ingredient) => console.log(ingredient))}
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient._id} ingredient={ingredient} />
      ))}
    </IngredientList>
  );
}
