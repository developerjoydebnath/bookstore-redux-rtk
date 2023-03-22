import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookList from '../components/BookList';
import { useGetBooksQuery } from '../features/api/apiSlice';
import { status } from '../features/filters/filterSlice';
import Loader from '../utils/Loader';

const Home = () => {
  const { data: books, isError, isLoading, error } = useGetBooksQuery();
  const { status: isFeatured, search: searchText } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  let content = null;

  if (isLoading) {
    <Loader />;
  }

  if (!isLoading && isError) {
    content = (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  if (!isLoading && !isError && books?.length === 0) {
    content = (
      <div>
        <h1>No books found...</h1>
      </div>
    );
  }

  if (!isLoading && !isError && books?.length > 0) {
    content = books
      .filter((book) => {
        if (isFeatured === 'featured') {
          return book.featured === true;
        } else {
          return book;
        }
      })
      .filter((book) => (searchText ? book.name.toLowerCase().includes(searchText.toLowerCase()) : book))
      .map((book) => <BookList key={book.id} book={book} />);
  }

  return (
    <div>
      <div className="py-12 px-6 2xl:px-6 container">
        <div className="order-2 xl:-order-1">
          <div className="flex items-center justify-between mb-12">
            <h4 className="mt-2 text-xl font-bold">Book List</h4>

            <div className="flex items-center space-x-4">
              <button className="lws-filter-btn active-filter" onClick={() => dispatch(status('all'))}>
                All
              </button>
              <button className="lws-filter-btn" onClick={() => dispatch(status('featured'))}>
                Featured
              </button>
            </div>
          </div>
          <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
