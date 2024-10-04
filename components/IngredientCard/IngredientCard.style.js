import styled from "styled-components";
export const CardWrapper = styled.div`
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

export const IngredientName = styled.a`
  padding: 10px;
  font-size: 17px;
  display: flex;
  width: 100%;
  text-decoration: none;
  color: var(--card-font-color);
  background-color: var(--card-background-color);
`;

export const FlavorTag = styled.a`
  border-radius: 1rem;
  padding: 10px;
`;

export const EditAnchor = styled.a`
  border-radius: 1rem;
  padding: 10px;
  text-decoration: none;
  background-color: lightgrey;
  color: inherit;
`;

export const DeleteButton = styled.button`
  border-radius: 1rem;
  padding: 8px;
  text-decoration: none;
  background-color: lightgrey;
  color: inherit;
  font: inherit;
  line-height: 1.5;
  border: none;
`;
