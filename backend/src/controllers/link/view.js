import Link from "../../model/link";
import { parseMessage } from "../../utils/helper";

const viewLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findOne({ where: { id } });
    if (link === null) {
        res.status(404).json(parseMessage("Link not found"));
        return;
      }
    res.status(200).json(parseMessage("Link retrieved", link));
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    return;
  }
};

export default viewLink;
