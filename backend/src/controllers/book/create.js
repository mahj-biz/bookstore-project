import Book from "../../models/bookModel";
import { parseMessage } from "../../utils/helper";

const createBook = async (req, res) => {
  try{
    //console.log(req.body);
    // Check for required field
    if(
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear 
    ) {
        return res.status(400).send({
            message : 'Send all required fields: title, author, publishYear',
        })
    };
 
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
    };
 
    const book = await Book.create(newBook);
 
    //return res.status(201).send(book);
    return res.status(201).json(parseMessage("Book created", book));
 
   } catch(error){
    console.log(error);
    res.status(500).send({message: "Server error", error : error.message });
    return;
   }
};

export default createBook;
