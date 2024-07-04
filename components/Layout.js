import styled from "styled-components";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
export function Layout({ children }) {
  return (
    <Body>
      <Header />
      <main>{children}</main>
      <NavBar />
    </Body>
  );
}
