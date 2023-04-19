import { User } from "../models/User.js";

export const registryHistory = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findByIdAndUpdate(id, {
      $push: {
        history: {
          $each: [req.body],
          $position: 0,
        },
      },
    });
    res.status(200).json({ message: "Registry History Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
