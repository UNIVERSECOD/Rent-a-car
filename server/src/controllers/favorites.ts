import { Request, Response } from "express";
import User from "../mongoose/schemas/user";
import mongoose from "mongoose";
import Rent from "../mongoose/schemas/rent";


//     try {
//       const userId = req.user?._id;
  
//       if (!userId) {
//         res.status(401).json({ error: "Unauthorized. User ID is missing." });
//         return;
//       }
  
//       const user = await User.findById(userId).populate("favorites");
  
//       if (!user) {
//         res.status(404).json({ error: "User not found." });
//         return;
//       }
  
//       const count = user.favorites.length;
  
//       res.status(200).json({
//         message: "Favorite rents retrieved successfully!",
//         count,
//         items: user.favorites,
//         isFavorite: userFavorites.includes(rent._id.toString()),
//         imageUrls: rent.imageUrls.map((url) => `${process.env.BASE_URL}${url}`),
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Internal server error!" });
//     }
//   };

const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
       res.status(401).json({ message: "Unauthorized access!" });
       return
    }

    const user = await User.findById(userId);

    if (!user) {
       res.status(404).json({ message: "User not found!" });
       return
    }

    const favoriteIds = user.favorites || [];
    const favorites = await Rent.find({ _id: { $in: favoriteIds } });

    res.status(200).json({
      message: "Favorites retrieved successfully!",
      count: favorites.length,
      items: favorites.map((rent) => ({
        ...rent.toObject(),
        isFavorite: true,
        imageUrls: rent.imageUrls.map((url) => `${process.env.BASE_URL}${url}`),
      })),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};


const updateFavoritesStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; 
    if (!userId) {
       res.status(401).json({ message: "User not authenticated." });
      return
    }

    const user = await User.findById(userId); 
    if (!user) {
       res.status(404).json({ message: "User not found." });
       return
    }

    const userFavorites = user.favorites; 

    const updatedRents = await Rent.updateMany(
      { _id: { $in: userFavorites } }, 
      { $set: { isFavorite: true } } 
    );

    await Rent.updateMany(
      { _id: { $nin: userFavorites } }, 
      { $set: { isFavorite: false } }
    );

    res.status(200).json({
      message: "Favorites status updated successfully.",
      updatedCount: updatedRents.modifiedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};


const addFavorite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // Ensure req.user is properly set up in middleware
    const { rentId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "User ID is required." });
      return;
    }

    if (!rentId) {
      res.status(400).json({ error: "Rent ID is required." });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(rentId)) {
      res.status(400).json({ error: "Invalid Rent ID." });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    if (!user.favorites) {
      user.favorites = []; 
    }

    const rentObjectId = new mongoose.Types.ObjectId(rentId);

    if (user.favorites.some((favorite) => favorite.equals(rentObjectId))) {
      res.status(400).json({ error: "Rent ID is already in favorites." });
      return;
    }

    user.favorites.push(rentObjectId);
    await user.save();

    res.status(200).json({
      message: "Car added to favorites.",
      favorites: user.favorites,
    });
  } catch (err) {
    console.error(err);
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
  updateFavoritesStatus
};

export default favoritesController;
