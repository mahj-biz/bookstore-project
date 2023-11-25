import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { parseMessage } from "../../utils/helper";
import User from "../../models/userModel";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //const user = await User.findOne({ where: { email } });
    const user = await User.findOne({ email: email }).exec();
    

    console.log(user);

    // No user return
    if (user === null) {
      res.status(401).json({ message: "Unauthorised" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // create access token
    const token = jwt.sign({ id: user.id }, config.jwtSecret);

    // compare password from body with database
    if (isMatch) {
      res.status(200).json({ message: "Login successful", data: user, token });
      return;
    } else {
      res.status(401).json(parseMessage("Unauthorised"));
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    return;
  }
};

export default login;
