import { useRouter } from "next/router";
import styled from "styled-components";

const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  list-style: none;
  width: 100%;
  height: var(--navbar-height);
  bottom: 0;
  position: fixed;
  z-index: 1;
`;

const NavBarItem = styled.a`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;

export function NavBar() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <NavList>
      <NavBarItem
        type="button"
        onClick={() => {
          router.push("/ingredients");
        }}
        style={{
          backgroundColor: pathname === "/ingredients" ? "hotpink" : "white",
        }}
      >
        Ingredients
      </NavBarItem>
      <NavBarItem
        type="button"
        onClick={() => {
          router.push("/pairings");
        }}
        style={{
          backgroundColor: pathname === "/pairings" ? "hotpink" : "white",
        }}
      >
        Pairings
      </NavBarItem>
    </NavList>
  );
}
