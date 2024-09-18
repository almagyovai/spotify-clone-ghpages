import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotificationPage from "./Pages/NotificationPage";
import NotFound from "./Pages/NotFound";
import SpotifyDataComponent from './Components/CardList';
import SpotifyPlayer from "./Containers/SpotifyPlayer";
import { TrackProvider } from './TrackContext';
import { loginToSpotify, getTokenFromUrl } from './spotifyAuth';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromUrl = getTokenFromUrl();
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      loginToSpotify();
    }
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <TrackProvider>
        <Routes>
          <Route path="/spotify-data" element={<SpotifyDataComponent token={token} />} />
          <Route path="/spotify-player" element={<SpotifyPlayer token={token} />} />
          <Route path="/" element={<HomePage token={token} />} />
          <Route path="/notification" element={<NotificationPage token={token} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </TrackProvider>
    </Router>
  );
}

export default App;
