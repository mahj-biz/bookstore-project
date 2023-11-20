import React, { useEffect, useState } from 'react';
// import * as React from 'react';
// import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ReactDataTables from '../components/home/ReactDataTables';
import BooksTable from '../components/home/BooksTable';
import { useDemoData } from '@mui/x-data-grid-generator';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    var columns = [
        { field: 'title', headerName: 'Title', width: 150,flex:1 },
        { field: 'author', headerName: 'Author', width: 150,flex:1 },
        { field: 'publishYear', headerName: 'Publish Year', width: 150,flex:0.5 },
    ];
    const VISIBLE_FIELDS = ['title', 'author', 'publishYear'];

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
                    //: (<ReactDataTables data={data} columns={columns}/>)
                    : (<ReactDataTables data={books} columns={columns} vf={VISIBLE_FIELDS} />)
                //: (<BooksTable books={books}/>)
            }
        </div>
    );

}

export default BookList