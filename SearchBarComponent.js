import React, { useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import styled from 'styled-components';
import SearchDropdown from '../Containers/SearchDropDown';
import { getTokenFromUrl } from '../spotifyAuth';

const StyledInput = styled.input`
  &&::placeholder {
    color: #fff;
  }
  font-size: 16px;
  background-color: #666666;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 10px 120px 10px 10px;
  outline: none;
  flex: 1;
`;

function SearchBarComponent({ isHomeActive, handleHomeClick }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  // Fetch token from localStorage or URL
  const token = localStorage.getItem('spotify_token') || getTokenFromUrl();

  // Debounce function to delay API call
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // API call to search Spotify tracks
  const searchSpotify = async (searchQuery) => {
    if (!searchQuery) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=5`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (data.error) {
        setError('Error fetching data');
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      const tracks = data.tracks?.items || [];
      if (tracks.length > 0) {
        setSuggestions(tracks.map((track) => ({ name: track.name, id: track.id })));
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data');
      setShowDropdown(false);
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of the search
  const debouncedSearchSpotify = useCallback(debounce(searchSpotify, 500), [token]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearchSpotify(value);
  };

  // Handle selection from the dropdown
  const handleSelect = (suggestion) => {
    setQuery(suggestion.name);
    setShowDropdown(false);
    navigate(`/track/${suggestion.id}`); // Navigate to the track page
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', position: 'relative' }}>
      {/* Home Icon */}
      <div style={{ backgroundColor: '#666666', padding: '5px 9px 0 9px', borderRadius: '50px', margin: '0' }}>
        <i onClick={handleHomeClick} style={{ fontSize: '34px', color: '#fff', cursor: 'pointer' }}>
          {isHomeActive ? <GoHomeFill /> : <GoHome />}
        </i>
      </div>

      {/* Search Bar */}
      <div className="searchBar" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: '600px', height: '45px', backgroundColor: '#666666', borderRadius: '50px', overflow: 'hidden', gap: '5px', position: 'relative' }}>
        <i style={{ fontSize: '30px', color: '#fff', padding: '5px 0px 0 8px' }}>
          <FiSearch />
        </i>
        <StyledInput
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for something..."
        />

        {/* Display loading indicator or error */}
        {loading && <div style={{ position: 'absolute', right: '10px', color: '#fff' }}>Loading...</div>}
        {error && <div style={{ position: 'absolute', right: '10px', color: 'red' }}>{error}</div>}

        {/* Display search suggestions */}
        {showDropdown && <SearchDropdown suggestions={suggestions} onSelect={handleSelect} />}
      </div>
    </div>
  );
}

export default SearchBarComponent;
