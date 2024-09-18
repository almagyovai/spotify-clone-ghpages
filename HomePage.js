import React from "react";
import "../Assets/App.css";
import { TopbarContainer } from "../Containers/TopbarContainer";
import { MainContainer } from "../Containers/MainContainer";
import { RightMenuContainer } from "../Containers/RightMenuContainer";
import { LeftMenuContainer } from "../Containers/LeftMenuContainer";
import SpotifyPlayer from "../Containers/SpotifyPlayer";

function HomePage({ token }) {
  return (
    <div className="App">
      <TopbarContainer />
      <div className="flex-container">
        <LeftMenuContainer token={token} />
        <MainContainer />
        <RightMenuContainer />
      </div>
      <div>
        <SpotifyPlayer token={token} />
      </div>
      <div className="background"></div>
    </div>
  );
}

export default HomePage;
