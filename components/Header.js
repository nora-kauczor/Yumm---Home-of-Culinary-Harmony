import styled from "styled-components";

const HeaderWrapper = styled.div`
  margin: 30px 0 40px 0;
  text-align: center;
  font-family: var(--header-font);
`;

const AppHeader = styled.h1`
  font-size: 3rem;
  margin: 0;
  padding: 0;
`;

const AppTagLine = styled.h3`
  margin: 0;
  padding: 0;
`;

export function Header() {
  return (
    <HeaderWrapper>
      <AppHeader>Yumm! </AppHeader>
      <AppTagLine>Home of Culinary Harmony</AppTagLine>
    </HeaderWrapper>
  );
}
