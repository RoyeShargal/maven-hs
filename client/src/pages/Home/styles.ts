import { styled } from "styled-components";

import { SPACING } from "../../consts/consts";

export const HomepageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: ${SPACING[4]};
  gap: ${SPACING[3]};
`;

export const StyledHelloTitle = styled.p`
  margin-bottom: ${SPACING[3]};
`;

export const GameEntranceContainer = styled.div`
  border-radius: ${SPACING[3]};
  background-color: #fafafe;
  height: 200px;
  width: 300px;
  padding: ${SPACING[4]};
`;

export const UsernameInputContainer = styled.div`
  display: flex;
  gap: ${SPACING[3]};
  flex-direction: column;
`;
