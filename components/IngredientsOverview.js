import styled from "styled-components";
import { IngredientCard } from "./IngredientCard";
import { flavors } from "@/lib/ingredients";
import { useState } from "react";

const OverviewContainer = styled.div``;
const FilterSection = styled.div``;
const FilterField = styled.input``;
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
`;

const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export function IngredientsOverview({ ingredients }) {
  const [filteredFlavors, setFilteredFlavors] = useState();

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
  }

  return (
    <OverviewContainer>
      <FilterSection>
        <FilterField onChange={handleChange} />
        {filteredFlavors && (
          <DropDown>
            {filteredFlavors.map((flavor) => (
              <>{flavor}</>
            ))}
          </DropDown>
        )}
      </FilterSection>

      <IngredientList>
        {ingredients.map((ingredient) => (
          <IngredientCard key={ingredient._id} ingredient={ingredient} />
        ))}
      </IngredientList>
    </OverviewContainer>
  );
}
