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
  color: var(--card-background-color);
`;

const NavBarItem = styled.a`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: var(--nav-background-color);
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
          backgroundColor:
            pathname === "/ingredients"
              ? `var(--nav-background-color)`
              : "grey",
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
          backgroundColor:
            pathname === "/pairings" ? `var(--nav-background-color)` : "grey",
        }}
      >
        Pairings
      </NavBarItem>
    </NavList>
  );
}
