import styled from "styled-components";

export const DetailsContainer = styled.div`
  margin: 20px 45px 0 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
export const NameAndTag = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
`;

export const Name = styled.h1`
  margin: 0;
  padding: 10px;
`;

export const FlavorTag = styled.a`
  border-radius: var(--primary-border-radius);
  padding: var(--anchor-padding);
  margin: 0;
`;

export const Description = styled.p`
  line-height: 1.5;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const BackButton = styled.a`
  border-radius: 0.5rem;
  padding: var(--anchor-padding);
  text-decoration: var(--button-anchor-text-decoration);
  text-align: center;
  font-size: 1rem;
  color: inherit;
  margin: 0;
`;

export const EditButton = styled.a`
  border-radius: var(--primary-border-radius);
  padding: var(--anchor-padding);
  text-decoration: var(--button-anchor-text-decoration);
  background-color: lightgrey;
  color: inherit;
  text-align: center;
`;
