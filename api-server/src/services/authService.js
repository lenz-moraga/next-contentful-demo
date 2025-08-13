import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../repositories/userRepository.js";

export const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) return null;

  //   const valid = await bcrypt.compare(password, user.PasswordHash);
  //   if (!valid) return null;

  if (password !== user.PasswordHash) return null; // Simple password check, replace with bcrypt in production

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};
