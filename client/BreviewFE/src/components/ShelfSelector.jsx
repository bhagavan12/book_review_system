import React from 'react';

const ShelfSelector = ({ shelves, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)} defaultValue="">
      <option value="" disabled>Select shelf</option>
      {shelves.map((shelf) => (
        <option key={shelf._id} value={shelf._id}>
          {shelf.name}
        </option>
      ))}
    </select>
  );
};

export default ShelfSelector;
