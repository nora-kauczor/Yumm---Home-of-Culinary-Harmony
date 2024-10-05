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
  border-radius: var(--primary-border-radius);
`;

export const IngredientName = styled.a`
  padding: var(--anchor-padding);
  font-size: 17px;
  display: flex;
  width: 100%;
  text-decoration: var(--button-anchor-text-decoration);
  color: var(--card-font-color);
  background-color: var(--card-background-color);
`;

export const FlavorTag = styled.a`
  border-radius: var(--primary-border-radius);
  padding: var(--anchor-padding);
`;

export const EditAnchor = styled.a`
  border-radius: var(--primary-border-radius);
  padding: var(--anchor-padding);
  text-decoration: var(--button-anchor-text-decoration);
  background-color: lightgrey;
  color: inherit;
`;

export const DeleteButton = styled.button`
  border-radius: var(--primary-border-radius);
  padding: var(--button-padding);
  text-decoration: var(--button-anchor-text-decoration);
  background-color: lightgrey;
  color: inherit;
  font: inherit;
  line-height: 1.5;
  border: none;
`;
