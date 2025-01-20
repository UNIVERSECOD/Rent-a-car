import { Request, Response } from "express";
import Rent from "../mongoose/schemas/rent";
import Category from "../mongoose/schemas/category";
import Location from "../mongoose/schemas/location";
import { deleteFiles, deleteFilesByPaths } from "../utils/file";
import User from "../mongoose/schemas/user";



const update = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const {name, username} =req.matchedData;

    const user = await User.findById(userId).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
       res.status(404).json({ message: "User not found" });
       return;
    }

    if (name) {
      user.name = name;
    }

    if (username) {
      user.username = username;
    }

    if (req.file) {
      user.avatar = req.file.path;
    }

    await user.save();

    res.status(200).json({ message: "User updated", item: user });
    
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const rentController = {
  update,
};

export default rentController;
