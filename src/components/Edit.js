import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditBookMutation } from '../features/api/apiSlice';

const Edit = ({ book }) => {
  const navigate = useNavigate();
  const [editBook, { isLoading, isSuccess, isError }] = useEditBookMutation();
  const {
    id,
    author: initialAuthor,
    featured: initialFeatured,
    name: initialName,
    price: initialPrice,
    rating: initialRating,
    thumbnail: initialThumbnail,
  } = book;

  const [name, setName] = useState(initialName);
  const [author, setAuthor] = useState(initialAuthor);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [price, setPrice] = useState(Number(initialPrice));
  const [rating, setRating] = useState(Number(initialRating));
  const [featured, setFeatured] = useState(initialFeatured);

  const fromReset = () => {
    setName('');
    setAuthor('');
    setThumbnail('');
    setPrice(0);
    setRating(0);
    setFeatured(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editBook({
      id,
      data: { name, author, thumbnail, price, rating, featured },
    });
    fromReset();
    navigate('/');
  };
  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="lws-bookName">Book Name</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-bookName"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-author">Author</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-thumbnail">Image Url</label>
        <input
          required
          className="text-input"
          type="text"
          id="lws-thumbnail"
          name="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 pb-4">
        <div className="space-y-2">
          <label htmlFor="lws-price">Price</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-rating">Rating</label>
          <input
            required
            className="text-input"
            type="number"
            id="lws-rating"
            name="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="lws-featured"
          type="checkbox"
          name="featured"
          className="w-4 h-4"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        <label htmlFor="lws-featured" className="ml-2 text-sm">
          {' '}
          This is a featured book{' '}
        </label>
      </div>

      <button type="submit" className="submit" id="lws-submit" disabled={isLoading}>
        Edit Book
      </button>
      {isSuccess && <h1>Book was added successfully</h1>}
      {isError && <h1>There was an error adding video!</h1>}
    </form>
  );
};

export default Edit;
