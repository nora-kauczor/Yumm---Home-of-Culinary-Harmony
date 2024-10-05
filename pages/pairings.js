import PairingsOverview from "@/components/PairingsOverview/PairingsOverview";

export default function PairingsPage({
  pairings,
  ingredients,
  filterIngredients,
}) {
  return (
    <PairingsOverview
      pairings={pairings}
      filterIngredients={filterIngredients}
      ingredients={ingredients}
    />
  );
}
