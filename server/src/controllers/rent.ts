import { Request, Response } from "express";
import Rent from "../mongoose/schemas/rent";
import Category from "../mongoose/schemas/category";

const getAll = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      fuel,
      gear,
      capacity,
      price,
      discountPrice,
      category,
      dropOffLocations,
      pickUpLocations,
    } = req.matchedData;

    const categoryExists = await Category.findById(category)

    const rents = await Rent.find();
    res.status(200).json({
      message: "Rents retrieved successfully!",
      items: rents,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    console.log(req.files);

    res.status(201).json({ message: "Rent created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const rentController = {
  create,
  remove,
  getAll,
};

export default rentController;
