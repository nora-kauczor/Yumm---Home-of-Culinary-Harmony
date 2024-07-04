import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  list-style: none;
  width: 100%;
  height: 50px;
  position: sticky;
  z-index: 1;
`;

const NavBarItem = styled.a`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
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
