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
    margin: 0;
    font-family: ${epilogue.style.fontFamily};


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
