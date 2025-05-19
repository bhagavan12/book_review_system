// // import React from 'react';

// // const BookCard = ({ book }) => {
// //   return (
// //     <div style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
// //       <h4>{book.title}</h4>
// //       <p>Author: {book.author}</p>
// //       <p>{book.description}</p>
// //     </div>
// //   );
// // };

// // export default BookCard;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const BookCard = ({ book }) => {
//     const navigate=useNavigate();
//     const handleCardClick=()=>{
//       localStorage.setItem('selectedBook', JSON.stringify(book));
//       navigate(`/book-details/${book._id}`);
//     }
    
//   return (
//     <div className="book-card" onClick={()=>handleCardClick()}>
//       <img src={book.coverUrl} alt={book.title} />
//       <h4>{book.title}</h4>
//       <p>{book.author}</p>
//     </div>
//   );
// };

// export default BookCard;

//v1 - 10-2-25 import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookCard.css';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    localStorage.setItem('selectedBook', JSON.stringify(book));
    navigate(`/book-details/${book._id}`);
  };
    
  return (
    <div className="book-item" onClick={handleCardClick}>
      <div className="book-cover">
        <img src={book.coverUrl} alt={book.title} />
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
