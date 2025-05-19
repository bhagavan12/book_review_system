import React from 'react';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShelfCard = ({ shelf, onDelete }) => {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bookshelf/${shelf._id}`);
  };
  return (
    <div className="bookshelf-card" onClick={handleClick}>
      <div className="shelf-header">
        <h3>{shelf.name}</h3>
        <button onClick={() => onDelete(shelf._id)}>
          <Trash2 size={18} />
        </button>
      </div>
      <p>{shelf.books?.length || 0} book(s)</p>
    </div>
  );
};

export default ShelfCard;
