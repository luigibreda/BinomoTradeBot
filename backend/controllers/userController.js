import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const genHashedString = async (string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(string, salt);
  return hashedString;
};

const genJWT = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const register = async (req, res) => {
  try {
    const { username, password, plan, expiresIn } = req.body;

    const hashedPassword = await genHashedString(password);
    const newUser = await User.create({
      username,
      plan,
      password: hashedPassword,
      expiresAt: new Date(
        new Date().getTime() + expiresIn * 24 * 60 * 60 * 1000
      ),
    });

    res.status(201).json({
      username: newUser.username,
      plan: newUser.plan,
      token: await genJWT({ id: newUser._id }),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Invalid password or username" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password or username" });
    }

    if (user.expiresAt < new Date())
      return res.status(400).json({ message: "Your subscription has expired" });

    res.status(200).json({
      username: user.username,
      plan: user.plan,
      token: await genJWT({ id: user._id }),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
