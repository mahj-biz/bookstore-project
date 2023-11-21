import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { BiShow } from 'react-icons/bi';
import ReactDataTables from '../components/home/ReactDataTables';
import BooksTable from '../components/home/BooksTable';
import { useDemoData } from '@mui/x-data-grid-generator';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import BookModal from '../components/home/BookModal';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [displayBook, setDisplayBook] = useState([]);

    var columns = [
        { field: 'title', headerName: 'Title', width: 150, flex: 1 },
        { field: 'author', headerName: 'Author', width: 150, flex: 1 },
        { field: 'publishYear', headerName: 'Publish Year', width: 150, flex: 0.5 },
        {
            field: "id",
            headerName: "Action",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                // const onClick = (e) => {
                //   e.stopPropagation(); // don't select this row after clicking

                //   console.log(params.row)
                //   return alert(`${params.row._id}`);
                // };

                //     return <Link to={`/books/details/${params.row._id}`}>
                //     <BsInfoCircle className='text-2xl text-green-800' />
                //   </Link>;
                //return <Button onClick={onClick}>Click</Button>;

                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    setShowModal(true)
                    setDisplayBook(params.row)
                    //console.log(params.row)
                    //return alert(`${params.row._id}`);
                };

                return <div className='flex justify-center gap-x-4'>
                    <BiShow
                        className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                        onClick={onClick}
                    />
                    <Link to={`/books/details/${params.row._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/books/edit/${params.row._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/books/delete/${params.row._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>

                    {/* {showModal && (
                        <BookModal book={params.row} onClose={() => setShowModal(false)} />
                    )} */}
                </div>;
            }
        }
    ];
    const VISIBLE_FIELDS = ['title', 'author', 'publishYear', 'id'];

    //const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

    // const { data } = useDemoData({
    //     dataSet: 'Employee',
    //     visibleFields: VISIBLE_FIELDS,
    //     rowLength: 100,
    //   });
    //       const columns = React.useMemo(
    //         () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    //         [data.columns],
    //     );
    // console.log(data)

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((response) => {
                //debugger
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>

            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {
                loading ? (<Spinner />)
                    : (<ReactDataTables data={books} columns={columns} vf={VISIBLE_FIELDS} />)
                //: (<BooksTable books={books}/>)
            }
            <div>
                {showModal && (
                    <BookModal book={displayBook} onClose={() => setShowModal(false)} />
                )}
            </div>

        </div>
    );

}

export default BookList