import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookToShelf } from '../features/bookshelves/bookshelfSlice';
import ShelfSelector from './ShelfSelector';

const AddToShelfModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const { shelves } = useSelector((state) => state.bookshelf);
  const { token } = useSelector((state) => state.user.user);
  const [selectedShelfId, setSelectedShelfId] = useState('');

  const handleAdd = () => {
    if (!selectedShelfId) return;
    dispatch(addBookToShelf({ shelfId: selectedShelfId, book, token }));
    onClose();
  };

  return (
    <div className="modal">
      <h3>Select a Shelf</h3>
      <ShelfSelector shelves={shelves} onSelect={setSelectedShelfId} />
      <div className="modal-actions">
        <button onClick={handleAdd}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddToShelfModal;
