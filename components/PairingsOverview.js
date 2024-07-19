import styled from "styled-components";
import PairingCard from "./PairingCard";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialPairings } from "@/lib/pairings";

const PairingsList = styled.ul`
  list-style: none;
  width: 80%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const WhiteSpace = styled.div`
  height: 40px;
`;

const OverviewContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 23px;
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
  background-color: var(--card-background-color);
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
  background-color: var(--card-background-color);
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

export default function PairingsOverview({ ingredients, filterIngredients }) {
  const [pairings, setPairings] = useLocalStorageState("pairings", {
    defaultValue: initialPairings,
  });
  const [noResults, setNoResults] = useState(false);
  const [filteredFlavors, setFilteredFlavors] = useState();
  const [userInput, setUserInput] = useState();
  if (!ingredients || !pairings) return <>Loading...</>;

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

  function handleClickDropDown(flavor) {
    setFilteredFlavors("");
    setUserInput("");
    filterIngredients(flavor);
  }

  return (
    <OverviewContainer>
      <FilterSection>
        <LabelAndMessage>
          <FilterLabel>
            Search by single flavor or flavor combination
          </FilterLabel>
          {noResults && <NoResultsMessage>No Results</NoResultsMessage>}
        </LabelAndMessage>
        <FieldDropDownAndButtonWrapper>
          <FieldAndDropDown>
            <FilterField
              name="first-input"
              value={userInput}
              onChange={handleChange}
            />
            {filteredFlavors && (
              <DropDown>
                {filteredFlavors.map((flavor) => (
                  <DropDownItem
                    type="button"
                    key={uid()}
                    onClick={() => handleClickDropDown(flavor)}
                  >
                    {flavor}
                  </DropDownItem>
                ))}
              </DropDown>
            )}
          </FieldAndDropDown>
          <FieldAndDropDown>
            <FilterField
              name="second-input"
              value={userInput}
              onChange={handleChange}
            />
            {filteredFlavors && (
              <DropDown>
                {filteredFlavors.map((flavor) => (
                  <DropDownItem
                    type="button"
                    key={uid()}
                    onClick={() => handleClickDropDown(flavor)}
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
      <PairingsList>
        {pairings.map((pairing) => (
          <PairingCard
            pairing={pairing}
            ingredients={ingredients}
            key={pairing._id}
            filterIngredients={filterIngredients}
          ></PairingCard>
        ))}
        <WhiteSpace />
      </PairingsList>
    </OverviewContainer>
  );
}
