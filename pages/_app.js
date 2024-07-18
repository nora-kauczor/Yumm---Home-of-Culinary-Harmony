import { Layout } from "@/components/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { useCallback, useState } from "react";
import { initialIngredients } from "@/lib/ingredients";
import useLocalStorageState from "use-local-storage-state";
import { initialPairings } from "@/lib/pairings";

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

  const [pairings, setPairings] = useLocalStorageState("pairings", {
    defaultValue: initialPairings,
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

  // function handleClickFlavor(clickedFlavor) {
  //   const ingredientsAfterClick = ingredients.filter(
  //     (ingredient) => ingredient.flavorProfile === clickedFlavor
  //   );
  //   setFilterResults(ingredientsAfterClick);
  // }

  //Wir verwenden useCallback, um sicherzustellen, dass editIngredients und handleClickFlavor nur dann neu erstellt werden, wenn sich die Abhängigkeiten ändern. -> aber ist das bei react nicht automatisch so? dass nur neues neu gerendert wird?
  const handleClickFlavor = useCallback((clickedFlavor) => {
    const ingredientsAfterClick = ingredients.filter(
      (ingredient) => ingredient.flavorProfile === clickedFlavor
    );
    setFilterResults(ingredientsAfterClick);
    console.log("handleClickFlavor was called", Date.now());
  }, []);

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <GlobalStyle />
          <Component
            {...pageProps}
            ingredients={ingredients}
            pairings={pairings}
            editIngredients={editIngredients}
            handleClickFlavor={handleClickFlavor}
            filterResults={filterResults}
            setFilterResults={setFilterResults}
          />
        </Layout>
      </SWRConfig>
    </>
  );
}
