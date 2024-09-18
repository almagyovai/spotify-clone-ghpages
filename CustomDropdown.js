// src/Components/CustomDropdown.js
import React from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: #666666;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px;
  color: #fff;
  cursor: pointer;
  
  &:hover {
    background-color: #555555;
  }
`;

const CustomDropdown = ({ suggestions, onSelect }) => {
  return (
    <DropdownContainer>
      {suggestions.length > 0 ? (
        suggestions.map((suggestion) => (
          <DropdownItem key={suggestion.id} onClick={() => onSelect(suggestion)}>
            {suggestion.name}
          </DropdownItem>
        ))
      ) : (
        <DropdownItem>No results</DropdownItem>
      )}
    </DropdownContainer>
  );
};

export default CustomDropdown;
