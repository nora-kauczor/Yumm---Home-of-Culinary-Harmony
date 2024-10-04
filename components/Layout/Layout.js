import * as Style from "./Layout.style";
import { Header } from "../Header/Header";
import { NavBar } from "../NavBar/NavBar";

export function Layout({ children }) {
  return (
    <Style.Body>
      <Header />
      <Style.Main>{children}</Style.Main>
      <NavBar />
    </Style.Body>
  );
}
