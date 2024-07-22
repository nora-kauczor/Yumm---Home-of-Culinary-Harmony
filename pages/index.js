import styled from "styled-components";

const HomePageContent = styled.a`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const GetStarted = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 17px;
  font-weight: 700;
  shadow: 5px;
  &:hover {
    box-shadow: 5px;
  }
`;

export default function HomePage() {
  return (
    <HomePageContent>
      <h3>It&apos;s nice to have you here.</h3>
      <p>
        {" "}
        Yumm! is your ultimate guide to the world of flavors. Whether
        you&apos;re a professional chef or a home cook, Yumm! helps you
        discover, store, and master the art of flavor combinations. Our app
        provides a vast library of flavors and ingredients, along with expert
        advice on how to combine them to create mouth-watering dishes.{" "}
      </p>
      <p>
        Whether you&apos;re experimenting in the kitchen or looking to perfect a
        classic dish, Yumm! is your go-to app for all things flavor. Unlock your
        culinary potential with Yumm! and make every meal a delicious adventure.
      </p>
      <GetStarted href="/ingredients">Get started</GetStarted>
    </HomePageContent>
  );
}
