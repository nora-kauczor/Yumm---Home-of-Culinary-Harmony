import styled from "styled-components";
import PairingCard from "./PairingCard";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialPairings } from "@/lib/pairings";
import { flavors } from "@/lib/ingredients";
import { uid } from "uid";

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

  const [filteredFlavors0, setFilteredFlavors0] = useState();
  const [filteredFlavors1, setFilteredFlavors1] = useState();
  const [userInputs, setUserInputs] = useState([]);
  const [filteredPairings, setFilteredPairings] = useState();
  if (!ingredients || !pairings) return <>Loading...</>;

  function handleChange() {
    const source = event.target.name;
    const newInput = event.target.value;
    const currentUserInputs = [...userInputs];
    const otherInput =
      source === "input0" ? currentUserInputs[1] : currentUserInputs[0];
    if (source === "input0") {
      setUserInputs([newInput, otherInput]);
    } else {
      setUserInputs([otherInput, newInput]);
    }
    if (!newInput) {
      source === "input0" ? setFilteredFlavors0("") : setFilteredFlavors1("");
      return;
    }
    const lowerCaseInput = newInput.toLowerCase();
    const lowerCaseFlavors = flavors.map((flavor) => flavor.toLowerCase());
    const matchingFlavors = lowerCaseFlavors.filter((flavor) =>
      flavor.startsWith(lowerCaseInput)
    );
    if (matchingFlavors.length === 0) {
      source === "input0" ? setFilteredFlavors0("") : setFilteredFlavors1("");
      return;
    }
    const capitalizedMatchingFlavors = matchingFlavors.map(
      (flavor) => flavor.charAt(0).toUpperCase() + flavor.slice(1)
    );
    source === "input0"
      ? setFilteredFlavors0(capitalizedMatchingFlavors)
      : setFilteredFlavors1(capitalizedMatchingFlavors);
  }

  function findIngredientById(id) {
    const foundIngredient = ingredients.find(
      (ingredient) => ingredient._id === id
    );
    return foundIngredient;
  }

  function turnIdArrayIntoFlavorArray(IdArray) {
    const ingredient0 = findIngredientById(IdArray[0]);
    const ingredient1 = findIngredientById(IdArray[1]);
    const flavor0 = ingredient0.flavorProfile;
    const flavor1 = ingredient1.flavorProfile;
    return [flavor0, flavor1];
  }

  function findMatchingFlavor(pairing, searchedFlavor) {
    const pairingFlavors = turnIdArrayIntoFlavorArray(pairing.ingredients);
    const matchingFlavor = pairingFlavors.find(
      (flavor) => flavor === searchedFlavor
    );
    return matchingFlavor;
  }

  function filterPairings(flavor0, flavor1) {
    // if there is an input0
    if (flavor0) {
      const matchingPairings0 = pairings.filter((pairing) =>
        findMatchingFlavor(pairing, flavor0)
      );
      // if theres input0 but no input1
      if (!flavor1) {
        if (matchingPairings0.length !== 0) {
          setFilteredPairings(matchingPairings0);
        }
        return;
      }
      // if there is input0 and input1
      const doubleInputMatches = matchingPairings0.filter((pairings) =>
        findMatchingFlavor(pairing, flavor1)
      );
      if (doubleInputMatches.length !== 0) {
        setFilteredPairings(doubleInputMatches);
      } else {
        setFilteredPairings(matchingPairings0);
      }
      return;
    } else {
      // if there is no input0
      const matchingPairings1 = pairings.filter((pairing) =>
        findMatchingFlavor(pairing, flavor0)
      );

      if (matchingPairings1.length !== 0) {
        setFilteredPairings(matchingPairings1);
      }
      return;
    }
  }

  //
  //   // if there's no matching flavors, set back filtered flavors (drop down options) and display error message and return
  //
  //   // else, set matching flavors (have them displayed in drop down)
  //
  //   // find matching ingredients and store them in filter Results state variable (ingredient cards which are being diplayed), set back message
  //   const matchingPairings = ingredients.filter((ingredient) =>
  //     capitalizedMatchingFlavors.includes(ingredient.flavorProfile)
  //   );
  //   setFilterResults(matchingIngredients);
  //   setNoResults(false);
  // }

  function handleClickReset() {
    setFilteredFlavors();
    setFilteredPairings(pairings);
    setNoResults(false);
    setUserInputs("");
  }

  // function handleClickDropDown(flavor) {
  //   setFilteredFlavors("");
  //   setUserInputs("");
  //   filterIngredients(flavor);
  // }

  return (
    <OverviewContainer>
      <FilterSection>
        <LabelAndMessage>
          <FilterLabel>
            Search by single flavor or flavor combination
          </FilterLabel>
          {/* {noResults && <NoResultsMessage>No Results</NoResultsMessage>} */}
        </LabelAndMessage>
        <FieldDropDownAndButtonWrapper>
          <FieldAndDropDown>
            <FilterField
              name="input0"
              value={userInputs[0]}
              onChange={handleChange}
            />
            {filteredFlavors0 && (
              <DropDown>
                {filteredFlavors0.map((flavor) => (
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
              name="input1"
              value={userInputs[1]}
              onChange={handleChange}
            />
            {filteredFlavors1 && (
              <DropDown>
                {filteredFlavors1.map((flavor) => (
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
          />
        ))}
      </PairingsList>
      <WhiteSpace />
    </OverviewContainer>
  );
}
