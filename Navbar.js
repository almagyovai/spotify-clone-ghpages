import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Components/Logo";
import SearchBarComponent from "./SearchBarComponent";
import MyAccountComponents from "./MyAccountComponents";
import Modal from "./Modal";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  width: 100%;
  padding: 5px 0px 0px 0px;
  position: relative;
  z-index: 1;
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 370px;
`;

function NavbarComponent() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHomeActive, setHomeActive] = useState(false);
  const [isNotificationIconActive, setNotificationIconActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    setHomeActive(path === "/");
    setNotificationIconActive(path === "/NotificationPage");
  }, [location.pathname]);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleNotificationIconClick = () => {
    navigate("/NotificationPage");
    setNotificationIconActive(true);
  };

  return (
    <NavbarContainer>
      <Navbar>
        <Logo />
        <SearchBarComponent 
          isHomeActive={isHomeActive} 
          handleHomeClick={handleHomeClick} 
        />
        <MyAccountComponents
          onOpenModal={() => setModalOpen(true)}
          onNotificationIconClick={handleNotificationIconClick}
          isNotificationIconActive={isNotificationIconActive}
        />
        {isModalOpen && (
          <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
            <div>
              <p className="modal-buttons">Account</p>
              <p className="modal-buttons">Profile</p>
              <p className="modal-buttons">Settings</p>
              <p className="modal-buttons" style={{ borderTop: "1px solid #fff" }}>
                Logout
              </p>
            </div>
          </Modal>
        )}
      </Navbar>
    </NavbarContainer>
  );
}

export default NavbarComponent;
