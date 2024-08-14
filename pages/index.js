import styled from "styled-components";

const HomePageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 20px;
  font-size: 17px;
`;

const IntroductionText = styled.p`
  margin: 0 0 0 0;
  padding: 0;
`;

const Yumm = styled.span`
  font-family: var(--header-font);
`;

const GetStarted = styled.a`
  margin: 0;
  padding: 0;
  color: inherit;
  text-decoration: none;
  font-weight: 700;
  shadow: 5px;
  &:hover {
    box-shadow: 5px;
  }
`;

export default function HomePage() {
  return (
    <HomePageContent>
      <IntroductionText>
        Hey there. It&apos;s nice seeing you here. <br />
        <br />
        <Yumm>Yumm!</Yumm> is your ultimate guide to the world of flavors.
        Whether you&apos;re a professional chef or a home cook,{" "}
        <Yumm>Yumm!</Yumm> helps you discover, store, and master the art of
        flavor combinations. Our app provides a vast library of flavors and
        ingredients, along with expert advice on how to combine them to create
        mouth-watering dishes.{" "}
      </IntroductionText>
      <GetStarted href="/ingredients">Click here to get started</GetStarted>
    </HomePageContent>
  );
}
