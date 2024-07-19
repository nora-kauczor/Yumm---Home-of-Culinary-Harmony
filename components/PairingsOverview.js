import styled from "styled-components";
import PairingCard from "./PairingCard";
import { useEffect, useState } from "react";
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
  const [filteredPairings, setFilteredPairings] = useState(pairings);

  // useEffect(() => {
  //   if (!pairings) return <>Loading...</>;
  //   setFilteredPairings(pairings);
  // }, [pairings]);

  if (!ingredients || !pairings) return <>Loading...</>;

  function updateUserInputs(source, newInput, otherInput) {
    if (source === "input0") {
      setUserInputs([newInput, otherInput]);
    } else {
      setUserInputs([otherInput, newInput]);
    }
    if (!newInput) {
      source === "input0" ? setFilteredFlavors0("") : setFilteredFlavors1("");
      return;
    }
  }

  function handleChange() {
    const source = event.target.name;
    const newInput = event.target.value;
    const currentUserInputs = [...userInputs];
    const otherInput =
      source === "input0" ? currentUserInputs[1] : currentUserInputs[0];
    updateUserInputs(source, newInput, otherInput);
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

  function findFlavorsOfPairing(pairing) {
    try {
      const IdArray = pairing.ingredients;
      const ingredient0 = findIngredientById(IdArray[0]);
      const ingredient1 = findIngredientById(IdArray[1]);
      const flavor0 = ingredient0.flavorProfile;
      const flavor1 = ingredient1.flavorProfile;
      return [flavor0, flavor1];
    } catch {
      console.log(
        "An error occurred. Ingredients prop of pairing could not be read."
      );
      return;
    }
  }

  function doesAFlavorMatch(pairing, searchedFlavor) {
    const pairingFlavors = findFlavorsOfPairing(pairing);
    const matchingFlavor = pairingFlavors.find(
      (flavor) => flavor === searchedFlavor
    );
    return true;
  }

  function handleClickDropDown(clickedFlavor) {
    const source = event.target.name;
    source === "input0" ? setFilteredFlavors0("") : setFilteredFlavors1("");
    const currentUserInputs = [...userInputs];
    const otherInput =
      source === "input0" ? currentUserInputs[0] : currentUserInputs[1];
    updateUserInputs(source, clickedFlavor, otherInput);

    try {
      const matchesClickedFlavor = pairings.filter((pairing) => {
        const pairingFlavors = findFlavorsOfPairing(pairing);
        return pairingFlavors.includes(clickedFlavor);
      });

      // if (!flavors.includes(otherInput)) {
      setFilteredPairings(matchesClickedFlavor);
      //   return;
      // }
      const matchingPairings = matchesClickedFlavor.filter((pairings) =>
        doesAFlavorMatch(otherInput)
      );
      if (!matchingPairings) {
        return;
      } else {
        setFilteredPairings(matchingPairings);
      }
    } catch {
      ("An eroror occurred.");
    }
  }

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
          <ResetButton
            type="button"
            // onClick={handleClickReset}
          >
            Reset
          </ResetButton>
        </FieldDropDownAndButtonWrapper>
      </FilterSection>
      <PairingsList>
        {filteredPairings.map((pairing) => (
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
