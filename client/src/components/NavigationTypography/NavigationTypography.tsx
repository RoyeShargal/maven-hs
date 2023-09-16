import React from "react";
import { useNavigate } from "react-router-dom";

import { StyledTypographyLink } from "./styles";

export interface NavigationTypoProps {
  title: string;
  pathToNavigate: string;
}

const NavigationTypography: React.FC<NavigationTypoProps> = ({
  pathToNavigate,
  title,
}) => {
  const navigate = useNavigate();
  return (
    <StyledTypographyLink onClick={() => navigate(pathToNavigate)}>
      {title}
    </StyledTypographyLink>
  );
};

export default NavigationTypography;
