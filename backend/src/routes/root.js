import express from 'express';
import getRoot from '../controllers/root/getRoot';
import postRoot from '../controllers/root/postRoot';
import bookRoute from './bookRoute';
import authRoutes from './auth';

const root = express.Router()

root.get('/', getRoot)
root.post('/', postRoot)
root.use('/auth',authRoutes);
root.use("/books", bookRoute);

export default root