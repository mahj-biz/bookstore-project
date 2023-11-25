import User from "../../models/userModel";
import bcrypt from "bcryptjs";
import { parseMessage } from "../../utils/helper";

const register = async (req, res) => {
  const { email, username, password, isAdmin } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedValue = bcrypt.hashSync(password, salt);
    const user = await User.create({ email, username, password: hashedValue,isAdmin });
    res.status(201).json(parseMessage("User created successfully", user));
  } catch (error) {
    res.status(500).send(error);
  }
};

export default register;