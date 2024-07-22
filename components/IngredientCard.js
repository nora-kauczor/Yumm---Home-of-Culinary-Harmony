import { getFlavorColor } from "@/utils/getFlavorColor";
import styled from "styled-components";

const CardWrapper = styled.div`
  font-size: 17px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card-background-color);
  padding: 20px;
  gap: 7px;
  border-radius: 1rem;
`;

const IngredientName = styled.a`
  padding: 10px;
  font-size: 17px;
  display: flex;
  width: 100%;
  text-decoration: none;
  color: var(--card-font-color);
  background-color: var(--card-background-color);
`;

const FlavorTag = styled.a`
  border-radius: 1rem;
  padding: 10px;
`;

const EditButton = styled.a`
  border-radius: 1rem;
  padding: 10px;
  text-decoration: none;
  background-color: lightgrey;
  color: inherit;
`;

const DeleteButton = styled.button`
  border-radius: 1rem;
  padding: 10px;
  text-decoration: none;
  background-color: lightgrey;
  color: inherit;
`;

export function IngredientCard({
  ingredient,
  filterIngredients,
  deleteIngredient,
}) {
  const flavorColor = getFlavorColor(ingredient.flavorProfile);

  return (
    <CardWrapper>
      <IngredientName href={`/${ingredient._id}`}>
        {ingredient.name}
      </IngredientName>
      <FlavorTag
        style={{ backgroundColor: flavorColor }}
        onClick={() => filterIngredients(ingredient.flavorProfile)}
      >
        {ingredient.flavorProfile}
      </FlavorTag>
      <EditButton href={`/form/${ingredient._id}`}>Edit</EditButton>
      <DeleteButton type="button" onClick={() => deleteIngredient(ingredient)}>
        Delete
      </DeleteButton>
    </CardWrapper>
  );
}
