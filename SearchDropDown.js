import React from 'react';

const SearchDropdown = ({ suggestions, onSelect }) => {
  return (
    <div style={{ position: 'absolute', top: '100%', left: '0', width: '100%', backgroundColor: '#666666', borderRadius: '0 0 50px 50px', maxHeight: '200px', overflowY: 'auto' }}>
      {suggestions.length > 0 ? (
        suggestions.map(suggestion => (
          <div
            key={suggestion.id}
            style={{ padding: '10px', cursor: 'pointer', color: '#fff' }}
            onClick={() => onSelect(suggestion)}
          >
            {suggestion.name}
          </div>
        ))
      ) : (
        <div style={{ padding: '10px', color: '#fff' }}>No results found</div>
      )}
    </div>
  );
};

export default SearchDropdown;
