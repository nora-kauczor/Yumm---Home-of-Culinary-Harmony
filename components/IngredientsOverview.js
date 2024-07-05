import styled from "styled-components";
import { IngredientCard } from "./IngredientCard";
import { flavors } from "@/lib/ingredients";
import { useId, useState } from "react";
import { uid } from "uid";

const OverviewContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
`;
const FilterSection = styled.div``;
const FilterField = styled.input``;
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
`;
const DropDownItem = styled.button``;
const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export function IngredientsOverview({ ingredients }) {
  const [filteredFlavors, setFilteredFlavors] = useState();
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

  // when user types
  function handleChange() {
    const input = event.target.value;
    const lowerCaseInput = input.toLowerCase();
    const lowerCaseFlavors = flavors.map((flavor) => flavor.toLowerCase());
    const matchingFlavors = lowerCaseFlavors.filter((flavor) =>
      flavor.startsWith(lowerCaseInput)
    );
    const capitalizedMatchingFlavors = matchingFlavors.map(
      (flavor) => flavor.charAt(0).toUpperCase() + flavor.slice(1)
    );
    input
      ? setFilteredFlavors(capitalizedMatchingFlavors)
      : setFilteredFlavors();
    const matchingIngredients = ingredients.filter((ingredient) =>
      capitalizedMatchingFlavors.includes(ingredient.flavorProfile)
    );
    setFilteredIngredients(matchingIngredients);
  }

  function handleClick(clickedFlavor) {
    // setFilteredFlavors("");
    const ingredientsAfterClick = ingredients.filter(
      (ingredient) => ingredient.flavorProfile === clickedFlavor
    );
    setFilteredIngredients(ingredientsAfterClick);
  }

  return (
    <OverviewContainer>
      <FilterSection>
        <FilterField onChange={handleChange} />
        {filteredFlavors && (
          <DropDown>
            {filteredFlavors.map((flavor) => (
              <DropDownItem
                type="button"
                key={uid()}
                onClick={handleClick(flavor)}
              >
                {flavor}
              </DropDownItem>
            ))}
          </DropDown>
        )}
      </FilterSection>
      <IngredientList>
        {filteredIngredients.map((ingredient) => (
          <IngredientCard key={ingredient._id} ingredient={ingredient} />
        ))}
      </IngredientList>
    </OverviewContainer>
  );
}
