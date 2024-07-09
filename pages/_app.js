import { Layout } from "@/components/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { useState } from "react";
import { ingredients } from "@/lib/ingredients";

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
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <GlobalStyle />
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </>
  );
}
