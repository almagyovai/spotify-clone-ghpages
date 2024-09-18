import React from 'react';
import { Link } from 'react-router-dom';

function MainAllMusic() {
  return (
    <div>
      <div>
        <div>
          <Link
            to="/all-music"
            style={{
              color: "inherit",
              textDecoration: "none",
              fontSize: "16px",
              color: "#fff",
            }}
          >
            <span
              style={{
                backgroundColor: "#666666",
                padding: "10px 15px",
                display: "inline-block",
                borderRadius: "250px",
                textAlign: "center",
              }}
            >
              All
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainAllMusic;
