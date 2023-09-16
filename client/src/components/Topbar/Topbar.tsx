import React from "react";

import { AppTopbar } from "./styles";
import NavigationTypography, {
  NavigationTypoProps,
} from "../NavigationTypography/NavigationTypography";

interface TopbarProps {
  links?: NavigationTypoProps[];
}

const Topbar: React.FC<TopbarProps> = ({ links = [] }) => {
  return (
    <AppTopbar>
      {links.map((link) => (
        <NavigationTypography
          title={link.title}
          pathToNavigate={link.pathToNavigate}
        />
      ))}
    </AppTopbar>
  );
};

export default Topbar;
