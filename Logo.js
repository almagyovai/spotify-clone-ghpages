import React from "react";
import { Link } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";

function Logo() {
  return (
    <div className="logo">
      <Link
        to="/"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "stretch",
          gap: "10px",
          textDecoration: "none",
        }}
      >
        <i style={{ fontSize: "32px", color: "#fff" }}>
          <FaSpotify />
        </i>
        <h2 style={{ fontSize: "22px", color: "#fff" }}>Spotify</h2>
      </Link>
    </div>
  );
}

export default Logo;
