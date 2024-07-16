import { flavors } from "@/lib/ingredients";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { uid } from "uid";

const StyledForm = styled.form`
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
const DeleteFlavorButton = styled.button``;

const SubmitButton = styled.button``;

const CancelButton = styled.button``;

export function Form({ ingredient, editIngredients }) {
  const [filteredFlavors, setFilteredFlavors] = useState();
  const [noResults, setNoResults] = useState(false);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [flavorSearchTerm, setFlavorSearchTerm] = useState();
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    if (ingredient) {
      setNameInput(ingredient.name);
    }
  }, [ingredient]);

  function handleNameChange() {
    const newName = event.target.value;
    ingredient.name = newName;
    setNameInput(newName);
  }

  useEffect(() => {
    if (!ingredient) {
      return;
    }
    setSelectedFlavors([ingredient.flavorProfile]);
  }, [ingredient]);

  if (!ingredient) {
    return <div>Loading...</div>;
  }

  function handleFlavorChange(event) {
    const input = event.target.value;
    setFlavorSearchTerm(input);
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
      return;
    }
    const capitalizedMatchingFlavors = matchingFlavors.map(
      (flavor) => flavor.charAt(0).toUpperCase() + flavor.slice(1)
    );
    setFilteredFlavors(capitalizedMatchingFlavors);
    setNoResults(false);
  }

  function handleClickFlavor(clickedFlavor) {
    setFilteredFlavors("");
    setFlavorSearchTerm("");
    setSelectedFlavors([clickedFlavor, ...selectedFlavors]);
  }

  function removeFlavor(flavorToRemove) {
    console.log("works");
    const flavors = selectedFlavors;
    const flavorsWithoutDeletedOne = flavors.filter(
      (flavor) => flavor !== flavorToRemove
    );
    setSelectedFlavors(flavorsWithoutDeletedOne);
  }

  function handleSubmit() {
    event.preventDefault();
    const data = new FormData(event.target);
    const userIngredient = Object.fromEntries(data);
    userIngredient.flavorProfile = selectedFlavors[0]; // if only one flavor is selected for now
    userIngredient._id = ingredient._id;
    editIngredients(userIngredient);

    // router.push("/ingredients");
  }

  function cancel() {
    router.push("/ingredients");
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <SingleInputSection>
        <InputLabel htmlFor="input-ingredient">Name</InputLabel>
        <InputField
          type="text"
          id="input-ingredient"
          name="name"
          value={ingredient.name}
          onChange={handleNameChange}
        />
      </SingleInputSection>
      <SingleInputSection>
        <LabelAndMessage>
          <InputLabel htmlFor="input-flavor">Flavor Tag</InputLabel>
          {noResults && <NoResultsMessage>No Results</NoResultsMessage>}
        </LabelAndMessage>
        <FieldAndDropDown>
          <InputField
            type="text"
            id="input-flavor"
            name="flavorProfile"
            onChange={handleFlavorChange}
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
        {selectedFlavors && (
          <SelectedFlavors>
            {selectedFlavors.map((flavor) => (
              <FlavorTag
                key={uid()}
                style={{
                  backgroundColor: `var(--${flavor.toLowerCase()}-color)`,
                }}
              >
                {flavor}
                <DeleteFlavorButton
                  type="button"
                  onClick={() => {
                    removeFlavor(flavor);
                  }}
                >
                  X
                </DeleteFlavorButton>
              </FlavorTag>
            ))}
          </SelectedFlavors>
        )}
      </SingleInputSection>
      <SingleInputSection>
        <InputLabel htmlFor="input-url">Image-URL</InputLabel>
        <InputField type="url" id="input-url" name="url" />
      </SingleInputSection>
      <SubmitButton type="submit">Submit</SubmitButton>
      <CancelButton onClick={() => cancel()}>Cancel</CancelButton>
    </StyledForm>
  );
}
