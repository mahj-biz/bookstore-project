import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { editBooks, getBooks } from '../utils/api/book'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const getBookData = async () => {
    try {
      const response = await getBooks(id);
      setAuthor(response.data.data.author);
      setPublishYear(response.data.data.publishYear)
      setTitle(response.data.data.title)
      setLoading(false);
      //console.log(response.data.data);
    } catch (error) {
      setLoading(false);
      alert('An error happened. Please Check console');
      enqueueSnackbar(error, { variant: 'error' });
      console.log(error);
    }
  }


  useEffect(() => {
    setLoading(true);
    getBookData()
    // axios.get(`http://localhost:5555/books/${id}`)
    // .then((response) => {
    //     setAuthor(response.data.book.author);
    //     setPublishYear(response.data.book.publishYear)
    //     setTitle(response.data.book.title)
    //     setLoading(false);
    //   }).catch((error) => {
    //     setLoading(false);
    //     alert('An error happened. Please Check console');
    //     console.log(error);
    //   });
  }, [])


  const handleEditBook = async (e) => {
    e.preventDefault();

    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);

    try {
      const response = await editBooks(id, data);
      //alert(response.data.message);
      setLoading(false);
      enqueueSnackbar(response.data.message, { variant: 'success' });
      navigate("/admin");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
      //alert(error.response.data.message);
    }
    // axios
    //   .put(`http://localhost:5555/books/${id}`, data)
    //   .then(() => {
    //     setLoading(false);
    //     enqueueSnackbar('Book Edited successfully', { variant: 'success' });
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
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook