import { Layout } from "@/components/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import { initialIngredients } from "@/lib/ingredients";
import useLocalStorageState from "use-local-storage-state";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while trying to fetch");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function App({ Component, pageProps }) {
  const [ingredients, setIngredients] = useLocalStorageState("ingredients", {
    defaultValue: initialIngredients,
  });

  function editIngredients(editedIngredient) {
    const index = ingredients.findIndex(
      (ingredient) => ingredient._id === editedIngredient._id
    );
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = editedIngredient;
    setIngredients(updatedIngredients);
  }

  const [filterResults, setFilterResults] = useState();
  useEffect(() => {
    if (!ingredients) {
      return;
    }
    setFilterResults(ingredients);
  }, [ingredients]);

  function filterIngredients(clickedFlavor) {
    const ingredientsAfterClick = ingredients.filter(
      (ingredient) => ingredient.flavorProfile === clickedFlavor
    );
    setFilterResults(ingredientsAfterClick);
  }

  function addIngredient(newIngredient) {
    const extendedIngredients = [...ingredients, newIngredient];
    console.log(extendedIngredients);
    setIngredients(extendedIngredients);
  }

  function deleteIngredient(IngredientToBeDeleted) {
    const ingredientsWithoutDeletedOne = ingredients.filter(
      (ingredient) => ingredient._id !== IngredientToBeDeleted._id
    );
    setIngredients(ingredientsWithoutDeletedOne);
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <GlobalStyle />
          <Component
            {...pageProps}
            ingredients={ingredients}
            editIngredients={editIngredients}
            filterIngredients={filterIngredients}
            filterResults={filterResults}
            setFilterResults={setFilterResults}
            addIngredient={addIngredient}
          />
        </Layout>
      </SWRConfig>
    </>
  );
}
