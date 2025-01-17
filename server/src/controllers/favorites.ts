import { Request, Response } from "express";
import User from "../mongoose/schemas/user";
import mongoose from "mongoose";

const getAll = async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;
  
      if (!userId) {
        res.status(401).json({ error: "Unauthorized. User ID is missing." });
        return;
      }
  
      const user = await User.findById(userId).populate("favorites");
  
      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }
  
      const count = user.favorites.length;
  
      res.status(200).json({
        message: "Favorite rents retrieved successfully!",
        count,
        items: user.favorites,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error!" });
    }
  };

  const addFavorite = async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id; 
      const { rentId } = req.params; 
  
      if (!userId || !rentId) {
        res.status(400).json({ error: "RentId is required." });
        return;
      }
  
      if (!mongoose.Types.ObjectId.isValid(rentId)) {
        res.status(400).json({ error: "Invalid RentId." });
        return;
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }
  
      if (user.favorites.some((id) => id.toString() === rentId)) {
        res.status(400).json({ error: "Car already in favorites." });
        return;
      }
  
      user.favorites.push(new mongoose.Types.ObjectId(rentId));
      await user.save();
  
      res
        .status(200)
        .json({ message: "Car added to favorites.", favorites: user.favorites });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error!" });
    }
  };
  const remove = async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;
      const { rentId } = req.params; 
  
      if (!userId || !rentId) {
        res.status(400).json({ error: "RentId is required." });
        return;
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        res.status(404).json({ error: "User not found." });
        return;
      }
  
      user.set(
        "favorites",
        user.favorites.filter((id: any) => id.toString() !== rentId)
      );
  
      await user.save();
  
      res.status(200).json({
        message: "Car removed from favorites.",
        favorites: user.favorites,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error!" });
    }
  };

const favoritesController = {
  remove,
  getAll,
  addFavorite,
};

export default favoritesController;
