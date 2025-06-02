import React, { useState } from "react";
import "./AddBook.css";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 

    fetch("https://library-project-backend-s5cx.onrender.com/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, description, imageUrl }),
    })
      .then((response) => response.json())
      .then(() => {
        setTitle("");
        setAuthor("");
        setDescription("");
        setImageUrl("");
        alert("Book added successfully!");
        setLoading(false); // Stop loader
      })
      .catch((error) => {
        console.error("Error adding book:", error);
        setLoading(false); // Stop loader on error
      });
  };

  return (
    <div>
      <img
        src="https://bookproject-preetidiwakargithubs-projects.vercel.app/photos/p2.jpg"
        className="addIMG"
        alt=""
      />
      <div className="add-book">
        <h1>Add a New Book</h1>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Adding book...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />

            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label>Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />

            <button type="submit">Add Book</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddBook;
