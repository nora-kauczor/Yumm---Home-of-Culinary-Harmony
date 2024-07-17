import Image from "next/image";
import styled from "styled-components";
import customImageLoader from "../utils/customImageLoader";

const DetailsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const NameAndTag = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
`;

const Name = styled.h1`
  margin: 0;
  padding: 10;
`;

const FlavorTag = styled.p`
  background-color: orange;
  border-radius: 1rem;
  padding: 10px;
  margin: 0;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const BackButton = styled.a`
  text-decoration: none;
  color: inherit;
  margin: 0;
`;

const EditButton = styled.a`
  text-decoration: none;
  color: inherit;
  margin: 0;
`;

export function IngredientDetails({ ingredient }) {
  if (!ingredient) return <>Loading...</>;
  const flavorLowerCase = ingredient.flavorProfile.toLowerCase();
  const colorString = `var(--${flavorLowerCase}-color)`;
  return (
    <DetailsContainer>
      <NameAndTag>
        <Name>{ingredient.name}</Name>
        <FlavorTag style={{ backgroundColor: colorString }}>
          {ingredient.flavorProfile}
        </FlavorTag>
      </NameAndTag>
      <Image
        loader={customImageLoader}
        src={ingredient.url ? ingredient.url : "/images/spices.jpg"}
        alt={"TODO"}
        width={300}
        height={200}
      />
      <ButtonContainer>
        <BackButton href={"/ingredients"}>Back</BackButton>
        <EditButton href={`/form/${ingredient._id}`}>Edit</EditButton>
      </ButtonContainer>
    </DetailsContainer>
  );
}
