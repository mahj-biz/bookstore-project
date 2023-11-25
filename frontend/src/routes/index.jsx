import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CreateBook from '../pages/CreateBook'
import ShowBook from '../pages/ShowBook'
import EditBook from '../pages/EditBook'
import DeleteBook from '../pages/DeleteBook'
import BookList from '../pages/BookList'

// import Dashboard from "../pages/Dashboard";
// import Settings from "../pages/Settings";
// import Users from "../pages/Users";
// import AddLink from "../pages/AddLink";
// import EditLink from "../pages/EditLink";
import Cookies from "universal-cookie";

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* protected routes */}
        <Route path="/admin/*" element={<ProtectedRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

const ProtectedRoutes = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>

      <Route path='/' element={<BookList />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  );
};

export default AppRoutes;
// <Route path="/" element={<Dashboard userId={1} />} />
//        <Route path="/addlinks" element={<AddLink />} />
//       <Route path="/editlinks/:id" element={<EditLink />} />
//       <Route path="/users" element={<Users />} />
//       <Route path="/settings" element={<Settings />} /> 