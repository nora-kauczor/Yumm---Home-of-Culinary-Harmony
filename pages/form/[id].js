import { Form } from "@/components/Form";

import { useRouter } from "next/router";

export default function FormPage({ editIngredients, ingredients }) {
  const router = useRouter();
  const { id } = router.query;
  if (!ingredients) {
    return <div>Loading...</div>;
  }
  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  return <Form ingredient={ingredient} editIngredients={editIngredients} />;
}
