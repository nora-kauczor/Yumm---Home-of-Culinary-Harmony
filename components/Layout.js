import styled from "styled-components";
import { Header } from "./Header";
import { NavBar } from "./NavBar";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export function Layout({ children }) {
  return (
    <Body>
      <Header />
      <Main>{children}</Main>
      <NavBar />
    </Body>
  );
}
