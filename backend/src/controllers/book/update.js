import Book from "../../models/bookModel";
import { parseMessage } from "../../utils/helper";

const updateBook = async (req, res) => {
  try {
    // Check for required field
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      })
    };

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    //return res.status(200).json({message: 'Book updated successfully'});
    res.status(200).json(parseMessage("Book updated successfully", result));

    return;
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
    return;
  }
};




export default updateBook;
