export async function fetchSpotifySearchResults(query, token) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,album,artist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    
    // Process and return the results as needed
    const tracks = data.tracks?.items || [];
    const albums = data.albums?.items || [];
    const artists = data.artists?.items || [];
    
    // Combine results or format them as needed
    return [...tracks, ...albums, ...artists];
  }
  