import styled from "styled-components";

export const NavList = styled.div`
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

export const NavBarItem = styled.a`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: var(--nav-background-color);
`;
