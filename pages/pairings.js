import PairingsOverview from "@/components/PairingsOverview";

export default function PairingsPage({
  pairings,
  ingredients,
  // handleClickFlavor,
}) {
  return (
    <PairingsOverview
      pairings={pairings}
      ingredients={ingredients}
      // handleClickFlavor={handleClickFlavor}
    />
  );
}
