import jwt from "jsonwebtoken";
import { SECRET } from "../constants";

const createToken = () => {
  return jwt.sign({ userId: 123 }, SECRET, { expiresIn: "1h" });
};

export { createToken };
