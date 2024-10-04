import * as Style from "./PairingsOverview.style";
import PairingCard from "../PairingCard/PairingCard";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialPairings } from "@/lib/pairings";
import { flavors } from "@/lib/ingredients";
import { uid } from "uid";
import { Solitreo } from "next/font/google";

export default function PairingsOverview({ ingredients, filterIngredients }) {
  const [pairings, setPairings] = useLocalStorageState("pairings", {
    defaultValue: initialPairings,
  });

  const [filteredFlavors0, setFilteredFlavors0] = useState([]);
  const [filteredFlavors1, setFilteredFlavors1] = useState([]);
  const [input0, setInput0] = useState("");
  const [input1, setInput1] = useState("");
  const [filteredPairings, setFilteredPairings] = useState(pairings);

  if (!ingredients || !pairings) return <>Loading...</>;

  function getMatchingFlavors(input, flavorsToCheck) {
    const lowerCaseInput = input.toLowerCase();
    const lowerCaseFlavors = flavorsToCheck.map((flavor) =>
      flavor.toLowerCase()
    );
    const matchingFlavors = lowerCaseFlavors.filter((flavor) =>
      flavor.startsWith(lowerCaseInput)
    );
    if (matchingFlavors.length === 0) {
      return;
    }
    const capitalizedMatchingFlavors = matchingFlavors.map(
      (flavor) => flavor.charAt(0).toUpperCase() + flavor.slice(1)
    );
    return capitalizedMatchingFlavors;
  }

  function getConcurringFlavor(input, flavorsToCheck) {
    const lowerCaseInput = input.toLowerCase();
    const lowerCaseFlavors = flavorsToCheck.map((flavor) =>
      flavor.toLowerCase()
    );
    const concurringFlavor = lowerCaseFlavors.find(
      (flavor) => flavor === lowerCaseInput
    );
    if (!concurringFlavor) {
      return;
    }
    const capitalizedConcurringFlavor =
      concurringFlavor.charAt(0).toUpperCase() + concurringFlavor.slice(1);
    return capitalizedConcurringFlavor;
  }

  function getFlavorsOfPairing(pairing) {
    try {
      const ingredient0 = ingredients.find(
        (ingredient) => ingredient._id === pairing.ingredients[0]
      );
      const ingredient1 = ingredients.find(
        (ingredient) => ingredient._id === pairing.ingredients[1]
      );
      const flavor0 = ingredient0.flavorProfile;
      const flavor1 = ingredient1.flavorProfile;
      return [flavor0, flavor1];
    } catch {
      console.log(
        "An error occurred. Ingredients prop of pairing could not be read."
      );
      return [null, null];
    }
  }

  function handleChange(event) {
    const source = event.target.name;
    const newInput = event.target.value;
    if (source === "input0") {
      setInput0(newInput);
      setFilteredFlavors1([]);
    } else {
      setInput1(newInput);
      setFilteredFlavors0([]);
    }
    if (!newInput) {
      if (source === "input0") {
        setFilteredFlavors0([]);
      } else {
        setFilteredFlavors1([]);
      }
      return;
    }

    const otherInput = source === "input0" ? input1 : input0;
    const concurringFlavorOtherInput = otherInput
      ? getConcurringFlavor(otherInput, flavors)
      : null;
    if (!concurringFlavorOtherInput) {
      const matchingFlavors = getMatchingFlavors(newInput, flavors);
      if (source === "input0") {
        setFilteredFlavors0(matchingFlavors || []);
      } else {
        setFilteredFlavors1(matchingFlavors || []);
      }
      return;
    }
    const matchingPairingsOfOtherInput = pairings.filter((pairing) => {
      const [flavor0, flavor1] = getFlavorsOfPairing(pairing);
      if (
        flavor0 === concurringFlavorOtherInput ||
        flavor1 === concurringFlavorOtherInput
      ) {
        return true;
      }
    });
    const flavorsOfRelevantPairings = matchingPairingsOfOtherInput.map(
      (pairing) => {
        const flavors = getFlavorsOfPairing(pairing);
        return flavors;
      }
    );
    const relevantFlavorsOneArray = flavorsOfRelevantPairings.flat();
    const relevantFlavorsWithoutDoublets = [
      ...new Set(relevantFlavorsOneArray),
    ];
    const relevantFlavorsWithoutPickedFlavor =
      relevantFlavorsWithoutDoublets.filter(
        (flavor) => flavor !== concurringFlavorOtherInput
      );
    const matchingFlavors = getMatchingFlavors(
      newInput,
      relevantFlavorsWithoutPickedFlavor
    );
    if (source === "input0") {
      setFilteredFlavors0(matchingFlavors || []);
    } else {
      setFilteredFlavors1(matchingFlavors || []);
    }
    return;
  }

  function handleClickDropDown(clickedFlavor) {
    const source = event.target.name;
    source.includes("0") ? setInput0(clickedFlavor) : setInput1(clickedFlavor);
    setFilteredFlavors0([]);
    setFilteredFlavors1([]);
    const matchesClickedFlavor = pairings.filter((pairing) => {
      const pairingFlavors = getFlavorsOfPairing(pairing);
      return pairingFlavors.includes(clickedFlavor);
    });
    const otherInput = source.includes("0") ? input1 : input0;
    const concurringFlavorOtherInput =
      otherInput && getConcurringFlavor(otherInput, flavors);
    if (!concurringFlavorOtherInput) {
      setFilteredPairings(matchesClickedFlavor);
      return;
    }
    const matchesForBothFlavors = matchesClickedFlavor.filter((pairing) => {
      const pairingFlavors = getFlavorsOfPairing(pairing);
      return pairingFlavors.includes(concurringFlavorOtherInput);
    });
    setFilteredPairings(matchesForBothFlavors);
  }

  function reset() {
    setInput0("");
    setInput1("");
  }

  return (
    <Style.OverviewContainer>
      <Style.FilterSection>
        <Style.LabelAndMessage>
          <label>
            Search by single flavor or by flavor combination
            <br />
            Pick flavor from drop down
          </label>
        </Style.LabelAndMessage>
        <Style.FieldDropDownAndButtonWrapper>
          <Style.FieldAndDropDown>
            <Style.FilterField
              name="input0"
              value={input0}
              onChange={() => handleChange(event)}
            />
            {filteredFlavors0.length !== 0 && (
              <Style.DropDown>
                {filteredFlavors0.map((flavor) => (
                  <Style.DropDownItem
                    type="button"
                    key={uid()}
                    name={`0-${flavor}`}
                    onClick={() => handleClickDropDown(flavor)}
                  >
                    {flavor}
                  </Style.DropDownItem>
                ))}
              </Style.DropDown>
            )}
          </Style.FieldAndDropDown>
          <Style.FieldAndDropDown>
            <Style.FilterField
              name="input1"
              value={input1}
              onChange={handleChange}
            />
            {filteredFlavors1.length !== 0 && (
              <Style.DropDown>
                {filteredFlavors1.map((flavor) => (
                  <Style.DropDownItem
                    type="button"
                    key={uid()}
                    name={`1-${flavor}`}
                    onClick={() => handleClickDropDown(flavor)}
                  >
                    {flavor}
                  </Style.DropDownItem>
                ))}
              </Style.DropDown>
            )}
          </Style.FieldAndDropDown>
          <Style.ResetButton type="button" onClick={reset}>
            Reset
          </Style.ResetButton>
        </Style.FieldDropDownAndButtonWrapper>
      </Style.FilterSection>
      <Style.PairingsList>
        {filteredPairings.map((pairing) => (
          <PairingCard
            pairing={pairing}
            ingredients={ingredients}
            key={pairing._id}
            filterIngredients={filterIngredients}
          />
        ))}
      </Style.PairingsList>
      <Style.WhiteSpace />
    </Style.OverviewContainer>
  );
}
