import { IngredientsOverview } from "@/components/IngredientsOverview";
import { ingredients } from "@/lib/ingredients";

export default function IngredientsPage() {
  return (
    <>
      <IngredientsOverview ingredients={ingredients} />
    </>
  );
}
