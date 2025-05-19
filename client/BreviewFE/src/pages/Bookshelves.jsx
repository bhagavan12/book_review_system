// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchBookshelves,
//   createBookshelf,
//   deleteBookshelf,
// } from '../features/bookshelves/bookshelfSlice';

// import { Loader2, Trash2 } from 'lucide-react';

// const BookshelvesPage = () => {
//   const dispatch = useDispatch();
//   const { shelves, loading, error } = useSelector((state) => state.bookshelf);
//   const {name,token}=useSelector((state)=>state.user.user);
//   const [newShelfName, setNewShelfName] = useState('');

//   useEffect(() => {
//     dispatch(fetchBookshelves(token));
//   }, [dispatch]);

//   const handleCreateShelf = () => {
//     console.log(newShelfName,token);
//     if (!newShelfName.trim()) return;
//     console.log(dispatch(createBookshelf({ name: newShelfName,token })));
//     setNewShelfName('');
//   };

//   const handleDeleteShelf = (shelfId) => {
//     if (window.confirm('Are you sure you want to delete this shelf?')) {
//       dispatch(deleteBookshelf(shelfId));
//     }
//   };

//   return (
//     <div className="bookshelf-container">
//       <h2>My Bookshelves</h2>
//       <div className="bookshelf-form">
//         <input
//           className="bookshelf-input"
//           placeholder="Enter bookshelf name"
//           value={newShelfName}
//           onChange={(e) => setNewShelfName(e.target.value)}
//         />
//         <button className="bookshelf-button" onClick={handleCreateShelf}>
//           Create
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : shelves.length === 0 ? (
//         <p>No bookshelves found.</p>
//       ) : (
//         shelves.map((shelf) => (
//           <div key={shelf._id} className="bookshelf-card">
//             <h3>{shelf.name}</h3>
//             <p>{shelf.books?.length || 0} book(s)</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default BookshelvesPage;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookshelves,
  createBookshelf,
  deleteBookshelf,
} from '../features/bookshelves/bookshelfSlice';
import ShelfCard from '../components/ShelfCard'; // 🆕 Import the component
import '../styles/Bookshelves.css'
const BookshelvesPage = () => {
  const dispatch = useDispatch();
  const { shelves, loading, error } = useSelector((state) => state.bookshelf);
  const { name, token } = useSelector((state) => state.user.user);
  const [newShelfName, setNewShelfName] = useState('');

  useEffect(() => {
    dispatch(fetchBookshelves(token));
  }, [dispatch]);

  const handleCreateShelf = () => {
    if (!newShelfName.trim()) return;
    console.log(dispatch(createBookshelf({ name: newShelfName, token })));
    setNewShelfName('');
  };

  const handleDeleteShelf = (shelfId) => {
    if (window.confirm('Are you sure you want to delete this shelf?')) {
      console.log(shelfId);
      dispatch(deleteBookshelf({shelfId,token}));
    }
  };

  return (
    <div className="bookshelf-container">
      <h2>My Bookshelves</h2>
      <div className="bookshelf-form">
        <input
          className="bookshelf-input"
          placeholder="Enter bookshelf name"
          value={newShelfName}
          onChange={(e) => setNewShelfName(e.target.value)}
        />
        <button className="bookshelf-button" onClick={handleCreateShelf}>
          Create
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : shelves.length === 0 ? (
        <p>No bookshelves found.</p>
      ) : (
        shelves.map((shelf) => (
          <ShelfCard
            key={shelf._id}
            shelf={shelf}
            onDelete={handleDeleteShelf}
          />
        ))
      )}
    </div>
  );
};

export default BookshelvesPage;
