import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Pages } from "../../consts/consts";
import {
  GameEntranceContainer,
  HomepageContainer,
  StyledHelloTitle,
  UsernameInputContainer,
} from "./styles";
import Button from "../../components/Button/Button";
import { createNewUser } from "../../api/api";

const Homepage = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const navigateToGame = () => navigate(Pages.GAME_PAGE);

  const onUsernameChange = (
    textInputEvent: React.ChangeEvent<HTMLInputElement>
  ) => setUsername(textInputEvent.target.value);

  const onStartButtonClicked = async () => {
    // check if user exists, if not => create:
    if (username === null) {
      setErrorMessage("Please type in username :)");
      return;
    }
    // if user exists in localStorage => start game without signing up
    if (!!localStorage.getItem("username")) navigateToGame();
    else {
      try {
        await createNewUser(username);
        localStorage.setItem("username", username);
        navigateToGame();
      } catch (err) {
        setErrorMessage("The username is taken, choose a new one please :)");
      }
    }
  };

  // clear current user
  const onLogoutButtonClicked = () => {
    setUsername("");
    localStorage.removeItem("username");
  };

  const previouslyLoggedInUser = useMemo(
    () => localStorage.getItem("username"),
    [localStorage.getItem("username")]
  );

  return (
    <HomepageContainer>
      <GameEntranceContainer>
        {previouslyLoggedInUser ? (
          <div>
            <StyledHelloTitle>Hello {username}</StyledHelloTitle>
            <Button title="Press to logout" onClick={onLogoutButtonClicked} />
          </div>
        ) : (
          <>
            <p>Hey! welcome to our game.</p>
            <p>Please insert your user name :)</p>
            <UsernameInputContainer>
              <input placeholder="User name" onChange={onUsernameChange} />
            </UsernameInputContainer>
          </>
        )}
        <Button onClick={onStartButtonClicked} title="START!" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </GameEntranceContainer>
    </HomepageContainer>
  );
};

export default Homepage;
