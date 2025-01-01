import { Request, Response } from "express";
import Rent from "../mongoose/schemas/rent";
import Category from "../mongoose/schemas/category";

const getAll = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories retrieved successfully!",
      items: categories,
    })
} catch (err){
  console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  
}
}

const create = async (req: Request, res: Response) => {
  try {
    const { title } = req.matchedData;
    const category = await Category.create({ title });

    res.status(201).json({
      message: "Category created successfully!",
      item: category,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hasAnyRent = await Rent.findOne({
      category: id,
    });

    if(hasAnyRent){
        res.status(400).json({ message: "Category is used in a rent"})
    }

   const category = await Category.findByIdAndDelete(id);

    if(!category){
        res.status(404).json({ message: "Category not found" });
        return;
    }

    res.status(200).json({ message: "Category deleted successfully!" });

  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const categoryController = {
  create,
  remove,
  getAll,
};

export default categoryController;
