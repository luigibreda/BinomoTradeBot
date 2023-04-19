import { User } from "../models/User.js";
import { Entry } from "../models/Entry.js";

export const registerEntry = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findByIdAndUpdate(id, {
      $push: {
        entries: {
          $each: [
            {
              ...req.body,
              createdAt: new Date().toISOString(),
            },
          ],
          $position: 0,
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({
      message: "Entry created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getEntrys = async (req, res) => {
  try {
    const entrys = await Entry.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json(entrys);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
