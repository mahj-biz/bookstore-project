import express from "express";
import Book from "../models/bookModel.js";
import isAuthenticated from '../middleware/isAuthenticated.js'
import createBook from "../controllers/book/create.js";
import listAllBook from "../controllers/book/list.js";
import viewBook from "../controllers/book/view.js";
import updateBook from "../controllers/book/update.js";
import deleteBook from "../controllers/book/delete.js";

const bookRoutes = express.Router();
const router = express.Router();

// Route for Save a new Book
bookRoutes.post("/", isAuthenticated, createBook);

// Route for Get All Books  
bookRoutes.get("/",isAuthenticated,listAllBook);

// Route for Get Books by id  
bookRoutes.get("/:id",isAuthenticated,viewBook);

// Route for Update a Book
bookRoutes.put("/:id",isAuthenticated,updateBook);

// Route for Delete a Book
bookRoutes.delete("/:id",isAuthenticated,deleteBook);


export default bookRoutes;
