import { styled } from "styled-components";

import { SPACING } from "../../consts/consts";

export const AppTopbar = styled.div`
  background-color: lightslategray;
  width: 100vw;
  height: 48px;
  display: flex;
  align-items: center;
  padding: ${SPACING[3]};
  gap: ${SPACING[3]};
`;
