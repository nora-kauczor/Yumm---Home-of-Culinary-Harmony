import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const NavList = styled.div`
  display: flex;
  justify-content: space-around;
  list-style: none;
  width: 100%;
`;

const NavBarItem = styled.a`
  width: 50%;
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
          backgroundColor: pathname === "/ingredients" ? "hotpink" : "grey",
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
          backgroundColor: pathname === "/pairings" ? "hotpink" : "grey",
        }}
      >
        Pairings
      </NavBarItem>
    </NavList>
  );
}
