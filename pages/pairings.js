import PairingsOverview from "@/components/PairingsOverview";

export default function PairingsPage({
  pairings,
  ingredients,
  handleClickFlavor,
}) {
  handleClickFlavor("Tangy");
  return (
    <PairingsOverview
      pairings={pairings}
      ingredients={ingredients}
      handleClickFlavor={handleClickFlavor}
    />
  );
}
