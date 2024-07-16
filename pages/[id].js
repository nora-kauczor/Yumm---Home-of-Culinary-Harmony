import { IngredientDetails } from "@/components/IngredientDetails";
import { ingredients } from "@/lib/ingredients";
import { useRouter } from "next/router";

export default function DetailsPage({ ingredients }) {
  console.log("log aus form page ", ingredients[0], Date.now());

  const router = useRouter();
  const { id } = router.query;

  const ingredient = ingredients.find((ingredient) => ingredient._id === id);
  return <IngredientDetails ingredient={ingredient} />;
}
