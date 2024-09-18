const CLIENT_ID = '49e2795afc694129a71d7d35d1246401';
const REDIRECT_URI = 'http://localhost:3000'; // Ensure this matches your Spotify Developer Dashboard settings
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'playlist-modify-public playlist-modify-private user-top-read user-library-read streaming user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control user-read-email playlist-read-private playlist-read-collaborative';

export const loginToSpotify = () => {
  window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
};

export const getTokenFromUrl = () => {
  const hash = window.location.hash;
  let token = '';

  if (hash) {
    try {
      token = hash
        .substring(1)
        .split('&')
        .find(elem => elem.startsWith('access_token'))
        .split('=')[1];
      window.location.hash = ''; // Clear the URL after extracting the token
      localStorage.setItem('spotify_access_token', token); // Save the token to localStorage
      handleTokenExpiration(); // Start token expiration timer
    } catch (error) {
      console.error('Error extracting token from URL:', error);
    }
  }

  // Return token from localStorage if URL extraction fails
  return token || localStorage.getItem('spotify_access_token');
};

const handleTokenExpiration = () => {
  const expirationTime = 3600 * 1000; // 1 hour
  setTimeout(() => {
    localStorage.removeItem('spotify_access_token');
    // Optionally trigger re-login
    loginToSpotify();
  }, expirationTime);
};

export const validateToken = async (token) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      console.error('Token is invalid or expired');
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
};
