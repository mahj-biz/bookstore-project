import Book from "../../models/bookModel";
import { parseMessage } from "../../utils/helper";

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    //return res.status(200).json({message: 'Book deleted successfully'});
    res.status(200).json(parseMessage("Book deleted successfully", result));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
    return;
  }
};

export default deleteBook;
