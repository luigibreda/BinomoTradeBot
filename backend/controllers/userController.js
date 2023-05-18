import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from 'moment';

const genHashedString = async (string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(string, salt);
  return hashedString;
};

const genJWT = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  return token;
};

export const register = async (req, res) => {
  try {
    const { username, password, plan, expiresIn } = req.body;

    const hashedPassword = await genHashedString(password);
    const expiresAt = new Date(
      new Date().getTime() + expiresIn * 24 * 60 * 60 * 1000
    );

    const newUser = await User.create({
      username,
      plan,
      password: hashedPassword,
      expiresAt,
    });

    res.status(201).json({
      username: newUser.username,
      id: newUser._id,
      plan: newUser.plan,
      expiresAt: newUser.expiresAt,
      token: await genJWT({ id: newUser._id }),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: error.message });
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

    const jwt = await genJWT({ id: user._id });

    res.status(200).json({
      username: user.username,
      id: user._id,
      plan: user.plan,
      token: jwt,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { email } = req.body.customer;
    const username = email.split('@')[0];

    const user = await User.findOneAndDelete({ username: username });

    if (user) {
      return res.status(200).json({ message: "User deleted" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { email } = req.body.customer;
    const username = email.split('@')[0];

    const user = await User.findOne({ username: username });

    if (user) {
      const newExpiresAt = moment().add(30, 'days');
      
      await User.findOneAndUpdate(
        { username: username },
        { expiresAt: newExpiresAt },
        { new: true }
      );

      return res.status(200).json({ message: "User updated" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};