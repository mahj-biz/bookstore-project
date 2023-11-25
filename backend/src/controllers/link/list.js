import Link from "../../model/link";
import { parseMessage } from "../../utils/helper";

const listAll = async (req, res) => {
  try {
    const links = await Link.findAll({
      order: [
      ['id', 'ASC']
  ],});
    const length = links.length;
    res.status(200).json(parseMessage(`${length} link(s) retrieved`, links)); 
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    return;
  }
};

export default listAll;
