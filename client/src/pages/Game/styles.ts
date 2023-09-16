import { styled } from "styled-components";

import { SPACING } from "../../consts/consts";

export const UserMessage = styled.p<{ userMessageColor: string }>`
  font-size: 40px;
  color: ${(props) => props.userMessageColor};
`;

export const MainGameContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: gray;
  padding: ${SPACING[4]};
`;

export const ScoreTypography = styled.p`
  font-size: 2.2rem;
  color: green;
  margin-top: ${SPACING[3]};
`;
