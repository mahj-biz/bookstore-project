import { postgresConnection } from "./connection.js";
import User from "../model/user.js";
import Link from "../model/link.js";

export const dbInit = async () => {
  try {
    await postgresConnection.authenticate();
    console.log("Connection has been established successfully.");
    await User.sync({ alter: true });
    await Link.sync({ alter: true });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default dbInit;


