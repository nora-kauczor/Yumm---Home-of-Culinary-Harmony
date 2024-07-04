import { NavBar } from "./NavBar";

export function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <NavBar />
    </>
  );
}
