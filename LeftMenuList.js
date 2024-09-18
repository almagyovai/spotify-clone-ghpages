import { IoAlbums } from "react-icons/io5";
import CarouselSlider from "../Components/CarouselSlider";
// import CardList from "../Components/CardList";

const LeftMenuList = () => {
  return (
    <div style={{ position: "relative" }}>
      <div
        className="title-wrapper"
        style={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          gap: "7px",
          marginBottom: "3em",
        }}
      >
        <IoAlbums style={{ fontSize: "24px", color: "#fff" }} />
        <h3 style={{ fontSize: "18px", color: "#fff" }}>Your Library</h3>
      </div>
      <CarouselSlider />
      {/* <CardList /> */}
    </div>
  );
};

export default LeftMenuList;
