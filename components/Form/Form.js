import { flavors } from "@/lib/ingredients";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { uid } from "uid";
import * as Style from "./Form.style";

export function Form({
  ingredient,
  editIngredient,
  addIngredient,
  deleteIngredient,
}) {
  const [filteredFlavors, setFilteredFlavors] = useState();
  const [message, setMessage] = useState("");
  const [urlMessage, setUrlMessage] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [flavorSearchTerm, setFlavorSearchTerm] = useState();
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (ingredient) {
      setNameInput(ingredient.name);
      ingredient.url && setUrlInput(ingredient.url);
      setSelectedFlavor(ingredient.flavorProfile);
    }
  }, [ingredient]);

  // if (!ingredient) {
  //   return <div>Loading...</div>;
  // }

  function handleNameChange() {
    const newName = event.target.value;
    ingredient && (ingredient.name = newName);
    setNameInput(newName);
  }

  function handleUrlChange() {
    const newUrl = event.target.value;
    ingredient && (ingredient.url = newUrl);
    setUrlInput(newUrl);
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
    setSelectedFlavor(clickedFlavor);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedFlavor.length === 0) {
      setMessage("Select at least one flavor");
      return;
    }

    // const newUrl = urlInput;
    // const img = new Image();
    // img.onload = function () {
    const data = new FormData(event.target);
    const userIngredient = Object.fromEntries(data);
    userIngredient.flavorProfile = selectedFlavor;
    userIngredient._id = ingredient ? ingredient._id : uid();
    userIngredient.byUser = true;
    if (ingredient) {
      editIngredient(userIngredient);
    } else {
      addIngredient(userIngredient);
    }
    router.push("/ingredients");
    // };

    // img.onerror = function () {
    //   setUrlMessage(true);
    // };

    // img.src = newUrl;
  }

  function handleClickDelete() {
    deleteIngredient(ingredient);
    router.push("/ingredients");
  }
  return (
    <Style.StyledForm onSubmit={handleSubmit}>
      <Style.SingleInputSection>
        <Style.InputLabel htmlFor="input-ingredient">Name</Style.InputLabel>
        <Style.InputField
          type="text"
          id="input-ingredient"
          name="name"
          maxLength={16}
          value={ingredient && ingredient.name}
          onChange={handleNameChange}
          required
        />
      </Style.SingleInputSection>
      <Style.SingleInputSection>
        <Style.LabelAndMessage>
          <Style.InputLabel htmlFor="input-flavor">Flavor Tag</Style.InputLabel>
          {message && <Style.Message>{message}</Style.Message>}
        </Style.LabelAndMessage>
        <Style.FieldAndDropDown>
          <Style.InputField
            type="text"
            id="input-flavor"
            name="flavorProfile"
            onChange={handleFlavorChange}
            value={flavorSearchTerm}
          />
          {filteredFlavors && (
            <Style.DropDown>
              {filteredFlavors.map((flavor) => (
                <Style.DropDownItem
                  type="button"
                  key={uid()}
                  onClick={() => {
                    handleClickFlavor(flavor);
                  }}
                >
                  {flavor}
                </Style.DropDownItem>
              ))}
            </Style.DropDown>
          )}
        </Style.FieldAndDropDown>
      </Style.SingleInputSection>
      {selectedFlavor && (
        <Style.FlavorTag
          key={uid()}
          style={{
            backgroundColor: `var(--${selectedFlavor.toLowerCase()}-color)`,
          }}
        >
          {selectedFlavor}
          <Style.DeleteFlavorButton
            type="button"
            onClick={() => {
              () => setSelectedFlavor("");
            }}
          >
            X
          </Style.DeleteFlavorButton>
        </Style.FlavorTag>
      )}

      <Style.SingleInputSection>
        <Style.LabelAndMessage>
          <Style.InputLabel htmlFor="input-url">Image-URL</Style.InputLabel>
          {urlMessage && <Style.Message>Not an image URL</Style.Message>}
        </Style.LabelAndMessage>
        <Style.InputField
          type="url"
          id="input-url"
          name="url"
          value={ingredient && ingredient.url}
          onChange={handleUrlChange}
          // required
        />
      </Style.SingleInputSection>
      <Style.ButtonContainer>
        <Style.Button type="submit">Submit</Style.Button>
        <Style.Button onClick={() => router.push("/ingredients")}>
          Cancel
        </Style.Button>
        {ingredient && (
          <Style.DeleteButton type="button" onClick={handleClickDelete}>
            Delete
          </Style.DeleteButton>
        )}
      </Style.ButtonContainer>
    </Style.StyledForm>
  );
}
