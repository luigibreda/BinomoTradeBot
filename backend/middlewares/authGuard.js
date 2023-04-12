import jwt from "jsonwebtoken";

export const authGuard = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Not authorized" });
    }
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "You are not authorized" });
  }
};
