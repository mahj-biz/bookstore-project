import Link from "../../model/link";
import { parseMessage } from "../../utils/helper";

const createLink = async (req, res) => {
  try {
    const { original_link } = req.body;
    const randomisedEightChar = Math.random().toString(36).substring(2, 10);
    const link = await Link.create({
      original_link,
      shortened_link: randomisedEightChar,
    });
    res.status(201).json(parseMessage("Link created", link));
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    return;
  }
};

export default createLink;
