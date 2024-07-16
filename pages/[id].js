import { IngredientDetails } from "@/components/IngredientDetails";
import { ingredients } from "@/lib/ingredients";
import { useRouter } from "next/router";

export default function DetailsPage({ ingredients }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(ingredients);
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);
  return <IngredientDetails ingredient={ingredient} />;
}
