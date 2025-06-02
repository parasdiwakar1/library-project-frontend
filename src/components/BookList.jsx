import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import ImageSlider from './ImageSlider';  
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://library-project-backend-s5cx.onrender.com/api/books?search=${search}`)
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, [search]);

  return (
    <div className='book-D'>
      <div className='search-div'>
        <input
          className='search'
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='SearchButton'>Search</button>
      </div>

      <ImageSlider />

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading books...</p>
        </div>
      ) : (
        <div className="book-list">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookList;
