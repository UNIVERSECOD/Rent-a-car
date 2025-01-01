import { Request, Response } from "express";
import Rent from "../mongoose/schemas/rent";
import Category from "../mongoose/schemas/category";
import Location from "../mongoose/schemas/location";
import { deleteFiles, deleteFilesByPaths } from "../utils/file";

const getAll = async (req: Request, res: Response) => {
  try {
   

    const rents = await Rent.find();
    res.status(200).json({
      message: "Rents retrieved successfully!",
      items: rents.map((rent) =>({
        ...rent.toObject(),
        imageUrls: rent.imageUrls.map((url) => `${process.env.BASE_URL}${url}`
    )})),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const create = async (req: Request, res: Response) => {
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

    const promises = [
      await Category.findById(category),
      await Location.countDocuments({
        _id: {
          $in: pickUpLocations,
        },
      }),
      await Location.countDocuments({
        _id: {
          $in: dropOffLocations,
        },
      })
    ]

    const [categoryExists,pickUpLocationsExistCount, dropOffLocationsExistCount  ] = await Promise.all(promises)


    if (!categoryExists) {
      deleteFiles(req.files as Express.Multer.File[]);
      res.status(400).json({ message: "Category not found" });
      return;
    }

    if (pickUpLocations.length !== pickUpLocationsExistCount) {
      deleteFiles(req.files as Express.Multer.File[]);
      res.status(400).json({ message: "Pick-up locations not found" });
      return;
    }

    if (dropOffLocations.length !== dropOffLocationsExistCount) {
      deleteFiles(req.files as Express.Multer.File[]);
      res.status(400).json({ message: "Drop-off locations not found" });
      return;
    }

    const rent = await Rent.create({
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
      imageUrls: (req.files as Express.Multer.File[]).map((file) => file.path),
    })

    res.status(201).json({ message: "Rent created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const rent = await Rent.findByIdAndDelete(id);
    if (!rent) {
      res.status(404).json({ message: "Rent not found" });
      return;
    }
    deleteFilesByPaths(rent.imageUrls);
    res.status(200).json({ message: "Rent deleted successfully!" });
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
