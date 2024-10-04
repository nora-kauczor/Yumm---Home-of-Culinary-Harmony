import { useRouter } from "next/router";
import * as Style from "./NavBar.style";

export function NavBar() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Style.NavList>
      <Style.NavBarItem
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
      </Style.NavBarItem>
      <Style.NavBarItem
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
      </Style.NavBarItem>
    </Style.NavList>
  );
}
