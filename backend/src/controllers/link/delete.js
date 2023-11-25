import Link from "../../model/link";
import { parseMessage } from "../../utils/helper";

const deleteLink = async (req, res) => {
    const { id } = req.params;
    const link = await Link.findOne({ where: { id } });
    if (link === null) {
      res.status(404).json(parseMessage("Link not found"));
      return;
    }
    try {
      await link.destroy();
      res.status(200).json(parseMessage("Link deleted", link));
      return;
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error });
      return;
    }
  };
  
  export default deleteLink;
  