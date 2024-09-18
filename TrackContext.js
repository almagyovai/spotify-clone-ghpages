// src/TrackContext.js
import React, { createContext, useContext, useState } from 'react';

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
  const [track, setTrack] = useState(null);

  return (
    <TrackContext.Provider value={{ track, setTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrack = () => useContext(TrackContext);
