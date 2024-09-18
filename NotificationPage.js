import React from "react";
import "../Assets/App.css";

import { TopbarContainer } from "../Containers/TopbarContainer.js";
import { MainNotificationContainer } from "../Containers/MainNotificationContainer.js";
import { RightMenuContainer } from "../Containers/RightMenuContainer.js";
import { LeftMenuContainer } from "../Containers/LeftMenuContainer.js";

function NotificationPage({ token }) {
  return (
    <div className="App">
      <TopbarContainer />
      <div className="flex-container">
        <LeftMenuContainer token={token} />
        <MainNotificationContainer />
        <RightMenuContainer />
      </div>

      <div className="background"></div>
    </div>
  );
}

export default NotificationPage;
