import { Request, Response } from "express";
import User from "../mongoose/schemas/user";



const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const { name, username } = req.body;

    const user = await User.findById(id).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (name) user.name = name;
    if (username) user.username = username;
    if (req.file?.path) user.avatar = req.file.path;

    await user.save();

    res.status(200).json({ message: "User updated", item: user });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error!",
      error: err instanceof Error ? err.message : err,
    });
  }
};


const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 

    const user = await User.findById(id).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User retrieved successfully!",
      item: {
        ...user.toObject(),
        avatarUrl: user.avatar ? `${process.env.BASE_URL}/${user.avatar}` : null,
      },
    });
  } catch (err) {
    console.error("Error retrieving user:", err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const rentController = {
  update,
  getById,
};

export default rentController;
