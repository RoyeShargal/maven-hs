import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Home/Homepage";
import Gamepage from "./pages/Game/Gamepage";
import PageNotFound from "./pages/NotFound/PageNotFound";
import { Pages, appLinks } from "./consts/consts";
import Topbar from "./components/Topbar/Topbar";
import "./app.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Topbar links={appLinks} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path={Pages.GAME_PAGE} element={<Gamepage />} />
        <Route path={Pages.NOT_FOUND_PAGE} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
