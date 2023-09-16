import axios from "axios";

export const guessUserGender = async (userName: string) => {
  const userGender = await axios.get(
    `https://api.genderize.io?name=${userName}`
  );

  const inferredGender =
    userGender?.data.probability > 0.95
      ? userGender?.data.gender
      : "undetermined";

  return inferredGender;
};
