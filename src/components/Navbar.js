import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { search } from '../features/filters/filterSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(search(e.target.value));
  };
  return (
    <nav className="py-4 2xl:px-6">
      <div className="container flex items-center justify-between">
        <span style={{ fontSize: '30px', fontWeight: '600' }}>BookStore</span>

        <ul className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-semibold cursor-pointer" id="lws-bookStore">
            <li>All Books</li>
          </Link>
          <Link to="/add-book" className="cursor-pointer font-semibold" id="lws-addBook">
            <li>Add Book</li>
          </Link>
        </ul>

        <form className="flex items-center">
          <div className="group relative rounded-md bg-white">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-primary"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Filter books..."
              className="search"
              id="lws-search"
              onChange={handleSubmit}
            />
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
