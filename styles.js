import { createGlobalStyle } from "styled-components";
import { Epilogue, Gabriela } from "next/font/google";

const gabriela = Gabriela({
  weight: "400",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  weight: "400",
  subsets: ["latin"],
});

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    background-color:   #A5D6A7;
  
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${epilogue.style.fontFamily};
    --header-font: ${gabriela.style.fontFamily};
--card-background-color: white;
--card-font-color: black;
--navbar-height: 50px;
--sweet-color: #FFDEE4;   
--savory-color: #C68958;  
--spicy-color: #FF7F50;   
--umami-color: #FFA07A;   
--creamy-color: #FFF8DC;  
--salty-color: #ADD8E6;   
--herbal-color: #32CD32;  
--sour-color: #FFFACD;    
--pungent-color: #E9967A; 
--bitter-color: #9ACD32;  
--fresh-color: #B0E57C;   
--tangy-color: #FFB6C1;   
  }
`;
