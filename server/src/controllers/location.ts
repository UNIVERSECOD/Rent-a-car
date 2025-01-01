import { Request, Response } from "express";
import Location from "../mongoose/schemas/location";
import Rent from "../mongoose/schemas/rent";

const create = async (req: Request, res: Response) => {
  try {
    const { title } = req.matchedData;
    const location = await Location.create({ title });

    res.status(201).json({
      message: "Location created successfully!",
      item: location,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hasAnyRent = await Rent.findOne({
      $or: [
        {
          pickUpLocations: {
            $in: [id],
          },
        },
        {
          dropOffLocations: {
            $in: [id],
          },
        },
      ],
    });

    if(hasAnyRent){
        res.status(400).json({ message: "Location is used in a rent"})
    }

    await Location.findByIdAndDelete(id);

    if(!location){
        res.status(404).json({ message: "Location not found" });
        return;
    }

    res.status(200).json({ message: "Location deleted successfully!" });

  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const locationController = {
  create,
  remove,
};

export default locationController;
