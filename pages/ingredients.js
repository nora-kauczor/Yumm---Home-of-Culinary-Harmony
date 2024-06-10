import { IngredientsOverview } from "@/components/IngredientsOverview";
import { ingredients } from "@/lib/ingredients";

export default function IngredientsPage() {
  return (
    <>
      <p>page</p>
      <IngredientsOverview ingredients={ingredients} />
    </>
  );
}
