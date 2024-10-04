import styled from "styled-components";

export const CardWrapper = styled.ul`
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
  background-color: var(--card-background-color);
  color: var(--card-font-color);
`;

export const IngredientName = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem;
  padding: 0;
  margin: 0;
  background-color: var(--card-background-color);
`;

export const FlavorsSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  background-color: var(--card-background-color);
`;

export const FlavorTag = styled.a`
  border-radius: 1rem;
  padding: 5px 10px 5px 10px;
`;

export const ReasonSection = styled.div`
  padding: 0 10px 0 30px;
  line-height: 1.5;
  background-color: var(--card-background-color);
  color: var(--card-font-color);
`;
