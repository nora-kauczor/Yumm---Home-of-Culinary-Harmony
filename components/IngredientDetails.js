import Image from "next/image";
import styled from "styled-components";
import customImageLoader from "../utils/customImageLoader";
import { getFlavorColor } from "@/utils/getFlavorColor";
import { useRouter } from "next/router";

const DetailsContainer = styled.div`
  margin: 20px 45px 0 45px;
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
  border-radius: 1rem;
  padding: 10px;
  margin: 0;
`;

const Description = styled.p`
  line-height: 1.5;
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

const DeleteButton = styled.button`
  border-radius: 1rem;
  padding: 10px;
  text-decoration: none;
  background-color: lightgrey;
  color: inherit;
`;

export function IngredientDetails({ ingredient, deleteIngredient }) {
  const router = useRouter();
  if (!ingredient) return <>Loading...</>;
  const flavorColor = getFlavorColor(ingredient.flavorProfile);
  function handleClick() {
    deleteIngredient(ingredient);
    router.push("/ingredients");
  }
  return (
    <DetailsContainer>
      <NameAndTag>
        <Name>{ingredient.name}</Name>
        <FlavorTag
        // style={{ backgroundColor: flavorColor }}
        >
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
      <Description>{ingredient.description}</Description>
      <ButtonContainer>
        <BackButton href={"/ingredients"}>Back</BackButton>
        <EditButton href={`/form/${ingredient._id}`}>Edit</EditButton>
        <DeleteButton type="button" onClick={handleClick}>
          Delete
        </DeleteButton>
      </ButtonContainer>
    </DetailsContainer>
  );
}
