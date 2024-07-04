import { IngredientDetails } from "@/components/IngredientDetails";
import { ingredients } from "@/lib/ingredients";
import { useRouter } from "next/router";

console.log(ingredients);

// export default function DetailsPage({}) {
//   const router = useRouter();
//   const { id } = router.query;

//   const ingredient = ingredients.find((ingredient) => (ingredient._id = id));
//   console.log("Logg von Page:", ingredient);
//   return <IngredientDetails ingredient={ingredient} />;
// }
