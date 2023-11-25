import Book from "../../models/bookModel";
import { parseMessage } from "../../utils/helper";

const listAllBook = async (req, res) => {
  try{
    const books = await  Book.find();
    //console.log(books);
   //  return res.status(200).json({
   //      count: books.length,
   //      data: books
   //  });
 
    const length = books.length;
     res.status(200).json(parseMessage(`${length} book(s) retrieved`, books)); 
    return;
   } catch(error){
    console.log(error);
    res.status(500).send({ message: "Server error", error: error.message  });
    return;
   }
};

export default listAllBook;
