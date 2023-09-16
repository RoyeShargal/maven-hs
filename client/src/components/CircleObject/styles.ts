import { styled } from "styled-components";

import { RandomObjectProps } from "./types";

export const RandomObject = styled.div<RandomObjectProps>`
  ${(props) =>
    props.objectPosition === "left"
      ? `left: ${props.sides}`
      : `right: ${props.sides}`};
  top: ${(props) => props.top};
  position: absolute;
  background-color: darkgreen;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
