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
  padding: 10;
`;

export const FlavorTag = styled.p`
  border-radius: 1rem;
  padding: 10px;
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
  text-decoration: none;
  color: inherit;
  margin: 0;
`;

export const EditButton = styled.a`
  text-decoration: none;
  color: inherit;
  margin: 0;
`;

export const DeleteButton = styled.button`
  border-radius: 1rem;
  padding: 10px;
  text-decoration: none;
  background-color: lightgrey;
  color: inherit;
`;
