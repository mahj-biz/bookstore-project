import Book from "../../models/bookModel";
import { parseMessage } from "../../utils/helper";

const viewBook = async (req, res) => {
  try {

    const { id } = req.params;
    const book = await Book.findById(id);
    if (book === null) {
      res.status(404).json(parseMessage("Book not found"));
      return;
    }
    //console.log(book);
    res.status(200).json(parseMessage("Book retrieved", book));
    return;

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
    return;
  }
};



export default viewBook;
