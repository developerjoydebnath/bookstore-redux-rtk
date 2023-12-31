import React from 'react';
import { useParams } from 'react-router-dom';
import Edit from '../components/Edit';
import { useGetBookQuery } from '../features/api/apiSlice';

const EditBook = () => {
  const { bookId } = useParams();
  const { data: singleBook, isLoading, isError } = useGetBookQuery(bookId);

  const book = singleBook?.data;

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <h1>There was an error!</h1>;
  }
  if (!isLoading && !isError && book?._id) {
    content = <Edit book={book} />;
  }

  return (
    <div>
      <main className="py-6 2xl:px-6">
        <div className="container">
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
            {content}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditBook;
