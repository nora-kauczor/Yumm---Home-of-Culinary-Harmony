import { IngredientDetails } from "@/components/IngredientDetails";
import { ingredients } from "@/lib/ingredients";
import { useRouter } from "next/router";

export default function DetailsPage({}) {
  const router = useRouter();
  const { id } = router.query;
  const ingredient = ingredients.find((ingredient) => ingredient.id === id);
  console.log(ingredient);
  return <IngredientDetails ingredient={ingredient} />;
}
