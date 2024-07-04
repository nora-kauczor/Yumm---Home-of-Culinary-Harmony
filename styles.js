import { createGlobalStyle } from "styled-components";
import { Epilogue } from "next/font/google";

const epilogue = Epilogue({
  weight: "400",
  subsets: ["latin"],
});

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 20px;
    font-family: ${epilogue.style.fontFamily};
  }

 
`;
