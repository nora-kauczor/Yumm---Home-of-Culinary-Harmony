import styled from "styled-components";

const AppHeader = styled.h1`
  text-align: center;
  margin: 30px 0 0 0;
  font-family: var(--header-font);
  font-size: 3rem;
`;

const AppTagLine = styled.h3`
  font-family: var(--header-font);
  margin: 0 0 60px 0;
`;

export function Header() {
  return (
    <>
      <AppHeader>Yumm! </AppHeader>
      <AppTagLine>Home of Culinary Harmony</AppTagLine>
    </>
  );
}
