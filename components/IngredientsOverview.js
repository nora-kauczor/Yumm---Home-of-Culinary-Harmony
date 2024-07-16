import styled from "styled-components";
import { IngredientCard } from "./IngredientCard";
import { flavors } from "@/lib/ingredients";
import { useEffect, useState } from "react";
import { uid } from "uid";

const OverviewContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const FilterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

// Upper part of filter section
const LabelAndMessage = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
`;
const FilterLabel = styled.label``;
const NoResultsMessage = styled.p`
  color: red;
  margin: 0;
  padding: 0;
`;
// Lower part of filter section
const FieldDropDownAndButtonWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
`;
const FieldAndDropDown = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
`;
const FilterField = styled.input`
  width: 100%;
  padding: 7px 5px 5px 5px;
  margin: 0;
  position: absolute;
  font-family: var(--general-font);
`;
const DropDown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: absolute;
  padding: 0;
  margin: 0;
  top: 29px;
  border: 1px solid black;
  border-top: none;
`;
const DropDownItem = styled.button`
  text-align: left;
  font-family: var(--general-font);
  font-size: 15px;
  border: none;
  padding: 5px;
  background-color: white;
`;

const ResetButton = styled.button`
  width: 30%;
  background-color: lightgrey;
  padding: 7px 5px 5px 5px;
  font-family: var(--general-font);
  font-size: 15px;
  border: 1px solid black;
`;

const IngredientList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export function IngredientsOverview({ ingredients }) {
  const [noResults, setNoResults] = useState(false);
  const [filteredFlavors, setFilteredFlavors] = useState();
  const [userInput, setUserInput] = useState();
  const [filterResults, setFilterResults] = useState();

  useEffect(() => {
    if (!ingredients) {
      return;
    }
    setFilterResults(ingredients);
  }, [ingredients]);

  if (!ingredients) return <>Loading...</>;

  function handleClickFlavor(clickedFlavor) {
    setFilteredFlavors("");
    const ingredientsAfterClick = ingredients.filter(
      (ingredient) => ingredient.flavorProfile === clickedFlavor
    );
    setFilterResults(ingredientsAfterClick);
    setUserInput("");
  }

  function handleChange() {
    const input = event.target.value;
    setUserInput(input);
    // if input field is empty, set back filtered flavors (drop down options) and message and return
    if (!input) {
      setNoResults(false);
      setFilteredFlavors();
      return;
    }
    // else, find matching flavors
    const lowerCaseInput = input.toLowerCase();
    const lowerCaseFlavors = flavors.map((flavor) => flavor.toLowerCase());
    const matchingFlavors = lowerCaseFlavors.filter((flavor) =>
      flavor.startsWith(lowerCaseInput)
    );
    // if there's no matching flavors, set back filtered flavors (drop down options) and display error message and return
    if (matchingFlavors.length === 0) {
      setNoResults(true);
      setFilterResults(ingredients);
      setFilteredFlavors();
      return;
    }
    // else, set matching flavors (have them displayed in drop down)
    const capitalizedMatchingFlavors = matchingFlavors.map(
      (flavor) => flavor.charAt(0).toUpperCase() + flavor.slice(1)
    );
    setFilteredFlavors(capitalizedMatchingFlavors);
    // find matching ingredients and store them in filter Results state variable (ingredient cards which are being diplayed), set back message
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

  return (
    <OverviewContainer>
      <FilterSection>
        <LabelAndMessage>
          <FilterLabel>Search flavor tags</FilterLabel>
          {noResults && <NoResultsMessage>No Results</NoResultsMessage>}
        </LabelAndMessage>
        <FieldDropDownAndButtonWrapper>
          <FieldAndDropDown>
            <FilterField value={userInput} onChange={handleChange} />
            {filteredFlavors && (
              <DropDown>
                {filteredFlavors.map((flavor) => (
                  <DropDownItem
                    type="button"
                    key={uid()}
                    onClick={() => {
                      handleClickFlavor(flavor);
                    }}
                  >
                    {flavor}
                  </DropDownItem>
                ))}
              </DropDown>
            )}
          </FieldAndDropDown>
          <ResetButton type="button" onClick={handleClickReset}>
            Reset
          </ResetButton>
        </FieldDropDownAndButtonWrapper>
      </FilterSection>
      <IngredientList>
        {filterResults &&
          filterResults.map((ingredient) => (
            <IngredientCard
              key={ingredient._id}
              ingredient={ingredient}
              handleClickFlavor={handleClickFlavor}
            />
          ))}
      </IngredientList>
    </OverviewContainer>
  );
}
