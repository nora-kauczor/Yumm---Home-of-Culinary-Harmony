import { IngredientOverview } from "@/components/IngredientOverview/IngredientOverview";

export default function IngredientsPage({
  ingredients,
  handleClickFlavor,
  filteredFlavors,
  setFilteredFlavors,
  filterResults,
  setFilterResults,
  userInput,
  setUserInput,
  filterIngredients,
  deleteIngredient,
}) {
  return (
    <>
      <IngredientOverview
        ingredients={ingredients}
        handleClickFlavor={handleClickFlavor}
        filteredFlavors={filteredFlavors}
        setFilteredFlavors={setFilteredFlavors}
        filterResults={filterResults}
        setFilterResults={setFilterResults}
        userInput={userInput}
        setUserInput={setUserInput}
        filterIngredients={filterIngredients}
        deleteIngredient={deleteIngredient}
      />
    </>
  );
}
