import { flavors } from "@/lib/ingredients";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { uid } from "uid";

const StyledForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 15px;
`;
const SingleInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InputLabel = styled.label``;
const InputField = styled.input``;
const LabelAndMessage = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
`;
const Message = styled.p`
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
  const [message, setMessage] = useState("");
  const [urlMessage, setUrlMessage] = useState(false);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [flavorSearchTerm, setFlavorSearchTerm] = useState();
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (ingredient) {
      setNameInput(ingredient.name);
      ingredient.url && setUrlInput(ingredient.url);
    }
  }, [ingredient]);

  function handleNameChange() {
    const newName = event.target.value;
    ingredient.name = newName;
    setNameInput(newName);
  }

  function handleUrlChange() {
    const newUrl = event.target.value;
    ingredient.url = newUrl;
    setUrlInput(newUrl);
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
      setMessage("");
      setFilteredFlavors();
      return;
    }
    const lowerCaseInput = input.toLowerCase();
    const lowerCaseFlavors = flavors.map((flavor) => flavor.toLowerCase());
    const matchingFlavors = lowerCaseFlavors.filter((flavor) =>
      flavor.startsWith(lowerCaseInput)
    );
    if (matchingFlavors.length === 0) {
      setMessage("No results");
      return;
    }
    const capitalizedMatchingFlavors = matchingFlavors.map(
      (flavor) => flavor.charAt(0).toUpperCase() + flavor.slice(1)
    );
    setFilteredFlavors(capitalizedMatchingFlavors);
    setMessage("");
  }

  function handleClickFlavor(clickedFlavor) {
    setFilteredFlavors("");
    setFlavorSearchTerm("");
    setSelectedFlavors([clickedFlavor, ...selectedFlavors]);
  }

  function removeFlavor(flavorToRemove) {
    const flavors = selectedFlavors;
    const flavorsWithoutDeletedOne = flavors.filter(
      (flavor) => flavor !== flavorToRemove
    );
    setSelectedFlavors(flavorsWithoutDeletedOne);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedFlavors.length === 0) {
      setMessage("Select at least one flavor");
      return;
    }

    const newUrl = urlInput;
    const img = new Image();
    img.onload = function () {
      const data = new FormData(event.target);
      const userIngredient = Object.fromEntries(data);
      userIngredient.flavorProfile = selectedFlavors[0]; // if only one flavor is selected for now
      userIngredient._id = ingredient._id;
      editIngredients(userIngredient);
      router.push("/ingredients");
    };

    img.onerror = function () {
      setUrlMessage(true);
    };

    img.src = newUrl;
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
          maxLength={12}
          value={ingredient.name}
          onChange={handleNameChange}
          required
        />
        <span id="charCount">0 / 12</span>
      </SingleInputSection>
      <SingleInputSection>
        <LabelAndMessage>
          <InputLabel htmlFor="input-flavor">Flavor Tag</InputLabel>
          {message && <Message>{message}</Message>}
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
        {selectedFlavors.length !== 0 && (
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
        <LabelAndMessage>
          <InputLabel htmlFor="input-url">Image-URL</InputLabel>
          {urlMessage && <Message>Not an image URL</Message>}
        </LabelAndMessage>
        <InputField
          type="url"
          id="input-url"
          name="url"
          value={ingredient.url}
          onChange={handleUrlChange}
          required
        />
      </SingleInputSection>
      <SubmitButton type="submit">Submit</SubmitButton>
      <CancelButton onClick={() => cancel()}>Cancel</CancelButton>
    </StyledForm>
  );
}
