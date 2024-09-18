import React from 'react';
import LeftMenuList from "../Components/LeftMenuList";
import SpotifyDataComponent from '../Components/CardList';

function LeftMenuContainer({ token }) {
  return (
    <div className="leftMenu">
      <LeftMenuList />
      <SpotifyDataComponent token={token} />
    </div>
  );
}

export { LeftMenuContainer };
