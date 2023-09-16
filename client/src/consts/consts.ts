import { NavigationTypoProps } from "../components/NavigationTypography/NavigationTypography";

export enum Pages {
  HOME_PAGE = "",
  GAME_PAGE = "game",
  NOT_FOUND_PAGE = "*",
}

export const appLinks: NavigationTypoProps[] = [
  { title: "Home", pathToNavigate: Pages.HOME_PAGE },
  { title: "Game", pathToNavigate: Pages.GAME_PAGE },
];

export const SPACING = {
  1: "4px",
  2: "8px",
  3: "16px",
  4: "32px",
};
