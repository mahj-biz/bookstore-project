import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { deleteBooks, getBooks } from '../utils/api/book'

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [book, setBook] = useState([]);

  const fetchBook = async () => {
    try {
      const response = await getBooks(id);
      setBook(response.data.data);
      setLoading(false);
    } catch (error) {
      //alert(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchBook();
  }, []);

  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      setLoading(false);
      const response = await deleteBooks(id);
      //alert(response.data.message);
      enqueueSnackbar(response.data.message, { variant: 'success' });
      navigate("/admin");
    } catch (error) {
      setLoading(false);
      console.log(error);
      //alert(error.response.data.message);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }

    // axios
    //   .delete(`http://localhost:5555/books/${id}`)
    //   .then(() => {
    //     setLoading(false);
    //     enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
    //     navigate('/');
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     // alert('An error happened. Please Check console');
    //     enqueueSnackbar('Error', { variant: 'error' });
    //     console.log(error);
    //   });
  };

  return (
    <div className='p-4'>
      <BackButton destination='/admin' />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Title</span>
          <span>{book.title}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Author</span>
          <span>{book.author}</span>
        </div>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook;