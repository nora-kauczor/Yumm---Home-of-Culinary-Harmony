import PairingsOverview from "@/components/PairingsOverview";

export default function PairingsPage({
  pairings,
  ingredients,
  filterIngredients,
}) {
  return (
    <PairingsOverview
      pairings={pairings}
      ingredients={ingredients}
      filterIngredients={filterIngredients}
    />
  );
}
