import React from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";
import Pfp from "../Assets/Images/default-pfp.jpg";

const profilePicture = {
  width: "50px",
  clipPath: "circle(50% at 50% 50%)",
};

function MyAccountComponents({
  onOpenModal,
  onNotificationIconClick,
  isNotificationIconActive,
}) {
  return (
    <div
      className="MyAccount"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "25px",
      }}
    >
      <Link to="/NotificationPage">
        <button
          onClick={(e) => {
            e.preventDefault();
            onNotificationIconClick();
          }}
          style={{
            fontSize: "34px",
            color: "#fff",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isNotificationIconActive ? (
            <IoNotifications />
          ) : (
            <IoNotificationsOutline />
          )}
        </button>
      </Link>
      <button
        onClick={onOpenModal}
        style={{
          fontSize: "36px",
          backgroundColor: "transparent",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img src={Pfp} alt="profile-picture" style={profilePicture} />
      </button>
    </div>
  );
}

export default MyAccountComponents;
