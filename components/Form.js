import { flavors } from "@/lib/ingredients";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { uid } from "uid";

const FormWrapper = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SingleInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InputLabel = styled.label``;
const InputField = styled.input`
  // width: 100%;
  // padding: 7px 5px 5px 5px;
  // margin: 0;
  // position: absolute;
  // font-family: var(--general-font);
`;
const LabelAndMessage = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
`;
const NoResultsMessage = styled.p`
  color: red;
  margin: 0;
  padding: 0;
`;

const FieldAndDropDown = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
`;

const DropDown = styled.ul`
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

const SelectedFlavors = styled.ul`
  list-style: none;
`;
const FlavorTag = styled.li`
  border-radius: 1rem;
  padding: 10px;
`;

const SubmitButton = styled.button``;

export function Form({ ingredient }) {
  const [filteredFlavors, setFilteredFlavors] = useState();
  const [noResults, setNoResults] = useState(false);
  const [userFlavors, setUserFlavors] = useState([]);
  const [flavorSearchTerm, setFlavorSearchTerm] = useState();

  useEffect(() => {
    if (!ingredient) {
      return;
    }
    setUserFlavors([ingredient.flavorProfile]);
  }, [ingredient]);

  if (!ingredient) {
    return <div>Loading...</div>;
  }

  function handleChange(event) {
    const input = event.target.value;
    setFlavorSearchTerm(input);
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
      return;
    }
    // else, set matching flavors (have them displayed in drop down)
    const capitalizedMatchingFlavors = matchingFlavors.map(
      (flavor) => flavor.charAt(0).toUpperCase() + flavor.slice(1)
    );
    setFilteredFlavors(capitalizedMatchingFlavors);
    setNoResults(false);
  }

  function handleClickFlavor(clickedFlavor) {
    setFilteredFlavors("");
    setFlavorSearchTerm("");
    setUserFlavors([clickedFlavor, ...userFlavors]);
  }

  function removeFlavor(flavorToRemove) {
    const flavors = userFlavors;
    const flavorsWithoutDeletedOne = flavors.filter(
      (flavor) => flavor !== flavorToRemove
    );
    setUserFlavors(flavorsWithoutDeletedOne);
    // setUserFlavors();
  }

  return (
    <FormWrapper>
      <SingleInputSection>
        <InputLabel>Name</InputLabel>
        <InputField type="text" inputValue={ingredient.name} />
      </SingleInputSection>
      <SingleInputSection>
        <LabelAndMessage>
          <InputLabel>Flavor Tag</InputLabel>
          {noResults && <NoResultsMessage>No Results</NoResultsMessage>}
        </LabelAndMessage>
        <FieldAndDropDown>
          <InputField
            type="text"
            onChange={handleChange}
            value={flavorSearchTerm}
          />
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
        {userFlavors && (
          <SelectedFlavors>
            {userFlavors.map((flavor) => (
              <FlavorTag
                key={uid()}
                style={{
                  backgroundColor: `var(--${flavor.toLowerCase()}-color)`,
                }}
              >
                {flavor}
                <button
                  onClick={() => {
                    removeFlavor(flavor);
                  }}
                >
                  X
                </button>
              </FlavorTag>
            ))}
            {/* <FlavorTag
              style={{
                backgroundColor: `var(--${ingredient.flavorProfile.toLowerCase()}-color)`,
              }}
            >
              {ingredient.flavorProfile}
              <button>X</button>
            </FlavorTag> */}
          </SelectedFlavors>
        )}
      </SingleInputSection>
      <SingleInputSection>
        <InputLabel>Image-URL</InputLabel>
        <InputField type="text" />
      </SingleInputSection>
      <SubmitButton type="submit">Submit</SubmitButton>
    </FormWrapper>
  );
}
