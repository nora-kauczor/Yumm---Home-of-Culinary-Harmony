import { IngredientsOverview } from "@/components/IngredientsOverview";

export default function IngredientsPage({ ingredients }) {
  return (
    <>
      <IngredientsOverview ingredients={ingredients} />
    </>
  );
}
