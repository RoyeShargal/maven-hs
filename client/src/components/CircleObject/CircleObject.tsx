import React, { useMemo } from "react";

import { RandomObject } from "./styles";
import { ObjectPosition } from "./types";
import { generateRandomNumber } from "../../utils/utils";

interface CircleObjectProps {
  objectPosition: ObjectPosition;
}

const CircleObject: React.FC<CircleObjectProps> = ({ objectPosition }) => {
  // generating random vertical position
  const objectVerticalPosition = useMemo(
    () => `${generateRandomNumber(10, 90)}vh`,
    []
  );

  // we can generate a random horizontal position too, to not make it too easy
  const objectHorizontalPosition = useMemo(
    () => `${generateRandomNumber(0, 15)}vw`,
    []
  );
  return (
    <RandomObject
      objectPosition={objectPosition}
      top={objectVerticalPosition}
      sides={objectHorizontalPosition}
    />
  );
};

export default CircleObject;
