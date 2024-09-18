import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTrack } from '../TrackContext'; // Import the TrackContext

const SpotifyDataComponent = ({ token }) => {
  const { setTrack } = useTrack(); // Access the setTrack function from TrackContext

  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setLoading(true);

      const fetchPlaylists = axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchTracks = axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchAlbums = axios.get('https://api.spotify.com/v1/me/albums', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchArtists = axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchPodcasts = axios.get('https://api.spotify.com/v1/me/shows', {
        headers: { Authorization: `Bearer ${token}` },
      });

      Promise.all([fetchPlaylists, fetchTracks, fetchAlbums, fetchArtists, fetchPodcasts])
        .then(responses => {
          const [playlistsResponse, tracksResponse, albumsResponse, artistsResponse, podcastsResponse] = responses;
          setPlaylists(playlistsResponse.data.items);
          setTracks(tracksResponse.data.items);
          setAlbums(albumsResponse.data.items);
          setArtists(artistsResponse.data.items);
          setPodcasts(podcastsResponse.data.items);
        })
        .catch(error => console.error('Error fetching Spotify data:', error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  // Click handler to select a track
  const handleTrackClick = (track) => {
    console.log('Selected track URI:', track.uri);
    setTrack(track); // Set the selected track in TrackContext
  };

  // Click handler to select a playlist
  const handlePlaylistClick = (playlist) => {
    console.log('Selected playlist URI:', playlist.uri);
    // Example: Needs Spotify support
    setTrack({ uri: playlist.uri }); // Placeholder logic
  };

  // Click handler to select an artist
  const handleArtistClick = (artist) => {
    console.log('Selected artist URI:', artist.uri);
    // Example: Needs Spotify support
    setTrack({ uri: artist.uri }); // Placeholder logic
  };

  if (loading) {
    return <div className="loading-message">Loading your Spotify data...</div>;
  }

  if (!playlists.length && !tracks.length && !albums.length && !artists.length && !podcasts.length) {
    return <div className="no-data-message">No Spotify data available.</div>;
  }

  return (
    <div className="scrollable-part">
      <h2>Playlists</h2>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id} onClick={() => handlePlaylistClick(playlist)} style={{ cursor: 'pointer' }}>
            <img src={playlist.images?.[0]?.url || 'default-image-url'} alt={playlist.name} style={{ width: '50px', height: '50px', borderRadius: '3px'}} />
            {playlist.name}
          </li>
        ))}
      </ul>

      <h2>Top Tracks</h2>
      <ul>
        {tracks.map(track => (
          <li key={track.id} onClick={() => handleTrackClick(track)} style={{ cursor: 'pointer' }}>
            <img src={track.album.images?.[0]?.url || 'default-image-url'} alt={track.name} style={{ width: '50px', height: '50px', borderRadius: '5px', verticalAlign: 'middle' }} />
            {track.name} by {track.artists.map(artist => artist.name).join(', ')}
          </li>
        ))}
      </ul>

      <h2>Saved Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.album.id}>
            <img src={album.album.images?.[0]?.url || 'default-image-url'} alt={album.album.name} style={{ width: '50px', height: '50px', borderRadius: '5px', verticalAlign: 'middle' }} />
            {album.album.name} by {album.album.artists.map(artist => artist.name).join(', ')}
          </li>
        ))}
      </ul>

      <h2>Top Artists</h2>
      <ul>
        {artists.map(artist => (
          <li key={artist.id} onClick={() => handleArtistClick(artist)} style={{ cursor: 'pointer' }}>
            <img src={artist.images?.[0]?.url || 'default-image-url'} alt={artist.name} style={{ width: '50px', height: '50px', borderRadius: '5px', verticalAlign: 'middle' }} />
            {artist.name}
          </li>
        ))}
      </ul>

      <h2>Podcasts</h2>
      <ul>
        {podcasts.map(podcast => (
          <li key={podcast.show.id}>
            <img src={podcast.show.images?.[0]?.url || 'default-image-url'} alt={podcast.show.name} style={{ width: '50px', height: '50px', borderRadius: '5px', verticalAlign: 'middle' }} />
            {podcast.show.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyDataComponent;
