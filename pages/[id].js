import { IngredientDetails } from "@/components/IngredientDetails/IngredientDetails";
import { useRouter } from "next/router";

export default function DetailsPage({ ingredients, deleteIngredient }) {
  const router = useRouter();
  const { id } = router.query;

  const ingredient = ingredients.find((ingredient) => ingredient._id === id);
  return (
    <IngredientDetails
      ingredient={ingredient}
      deleteIngredient={deleteIngredient}
    />
  );
}
