import Image from "next/image";
import * as Style from "./IngredientDetails.style";
import customImageLoader from "../../utils/customImageLoader";
import { getFlavorColor } from "@/utils/getFlavorColor";
import { useRouter } from "next/router";

export function IngredientDetails({ ingredient, deleteIngredient }) {
  const router = useRouter();
  if (!ingredient) return <>Loading...</>;
  const flavorColor = getFlavorColor(ingredient.flavorProfile);
  function handleClick() {
    deleteIngredient(ingredient);
    router.push("/ingredients");
  }
  return (
    <Style.DetailsContainer>
      <Style.NameAndTag>
        <Style.Name>{ingredient.name}</Style.Name>
        <Style.FlavorTag
        // style={{ backgroundColor: flavorColor }}
        >
          {ingredient.flavorProfile}
        </Style.FlavorTag>
      </Style.NameAndTag>
      <Image
        loader={customImageLoader}
        src={ingredient.url ? ingredient.url : "/images/spices.jpg"}
        alt={"TODO"}
        width={300}
        height={200}
      />
      <Style.Description>{ingredient.description}</Style.Description>
      <Style.ButtonContainer>
        <Style.BackButton href={"/ingredients"}>Back</Style.BackButton>
        <Style.EditButton href={`/form/${ingredient._id}`}>
          Edit
        </Style.EditButton>
        <Style.DeleteButton type="button" onClick={handleClick}>
          Delete
        </Style.DeleteButton>
      </Style.ButtonContainer>
    </Style.DetailsContainer>
  );
}
