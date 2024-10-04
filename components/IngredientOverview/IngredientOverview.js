import * as Style from "./IngredientOverview.style";
import { IngredientCard } from "../IngredientCard/IngredientCard";
import { flavors } from "@/lib/ingredients";
import { useState } from "react";
import { uid } from "uid";

export function IngredientOverview({
  ingredients,
  filterIngredients,
  filterResults,
  setFilterResults,
  deleteIngredient,
}) {
  const [noResults, setNoResults] = useState(false);
  const [filteredFlavors, setFilteredFlavors] = useState();
  const [userInput, setUserInput] = useState();

  if (!ingredients || !filterResults) return <>Loading...</>;

  function handleChange() {
    const input = event.target.value;
    setUserInput(input);
    if (!input) {
      setNoResults(false);
      setFilteredFlavors();
      return;
    }
    const lowerCaseInput = input.toLowerCase();
    const lowerCaseFlavors = flavors.map((flavor) => flavor.toLowerCase());
    const matchingFlavors = lowerCaseFlavors.filter((flavor) =>
      flavor.startsWith(lowerCaseInput)
    );
    if (matchingFlavors.length === 0) {
      setNoResults(true);
      setFilterResults(ingredients);
      setFilteredFlavors();
      return;
    }
    const capitalizedMatchingFlavors = matchingFlavors.map(
      (flavor) => flavor.charAt(0).toUpperCase() + flavor.slice(1)
    );
    setFilteredFlavors(capitalizedMatchingFlavors);
    const matchingIngredients = ingredients.filter((ingredient) =>
      capitalizedMatchingFlavors.includes(ingredient.flavorProfile)
    );
    setFilterResults(matchingIngredients);
    setNoResults(false);
  }

  function handleClickReset() {
    setFilteredFlavors();
    setFilterResults(ingredients);
    setNoResults(false);
    setUserInput("");
  }

  function handleClickDropDown(flavor) {
    setFilteredFlavors("");
    setUserInput("");
    filterIngredients(flavor);
  }

  return (
    <Style.OverviewContainer>
      <Style.FilterSection>
        <Style.LabelAndMessage>
          <label>Search by flavors</label>
          {noResults && (
            <Style.NoResultsMessage>No Results</Style.NoResultsMessage>
          )}
        </Style.LabelAndMessage>
        <Style.FieldDropDownAndButtonWrapper>
          <Style.FieldAndDropDown>
            <Style.FilterField value={userInput} onChange={handleChange} />
            {filteredFlavors && (
              <Style.DropDown>
                {filteredFlavors.map((flavor) => (
                  <Style.DropDownItem
                    type="button"
                    key={uid()}
                    onClick={() => handleClickDropDown(flavor)}
                  >
                    {flavor}
                  </Style.DropDownItem>
                ))}
              </Style.DropDown>
            )}
          </Style.FieldAndDropDown>
          <Style.ResetButton type="button" onClick={handleClickReset}>
            Reset
          </Style.ResetButton>
        </Style.FieldDropDownAndButtonWrapper>
      </Style.FilterSection>
      <Style.IngredientList>
        {filterResults &&
          filterResults.map((ingredient) => (
            <IngredientCard
              key={ingredient._id}
              ingredient={ingredient}
              filterIngredients={filterIngredients}
              deleteIngredient={deleteIngredient}
            />
          ))}
      </Style.IngredientList>
      <Style.WhiteSpace />
      <Style.AddButton href="/form/add">+</Style.AddButton>
    </Style.OverviewContainer>
  );
}
