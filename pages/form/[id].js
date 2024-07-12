import { Form } from "@/components/Form";
import { ingredients } from "@/lib/ingredients";
import { useRouter } from "next/router";

export default function FormPage() {
  const router = useRouter();
  const { id } = router.query;

  const ingredient = ingredients.find((ingredient) => ingredient._id === id);


  return <Form ingredient={ingredient} />;
}
