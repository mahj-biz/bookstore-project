import Link from "../../model/link";
import { parseMessage } from "../../utils/helper";

const updateLink = async (req, res) => {
  const { original_link } = req.body;
  const { id } = req.params;  
   try {
   const link = await Link.findOne({ where: { id } }); 
    if (link === null) {
    res.status(404).json(parseMessage("Link not found"));
    return;  
     } 
    await link.update({ original_link });
    await link.save();
    res.status(200).json(parseMessage("Link updated", link));
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    return;
  }
};

export default updateLink;
