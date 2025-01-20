import { Request, Response } from "express";
import Reservation from "../mongoose/schemas/reservation";
import Rent from "../mongoose/schemas/rent";
import Location from "../mongoose/schemas/location";
import { calculateDatesBetween } from "../utils/reservation";
import { ReservationStatus } from "../types/reservation";
import { UserRole } from "../types/user";

const getAll = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const filter: Record<string, any> = {};
    if (user!.role !== "admin") {
      filter.customer = user!._id;
    }

    const reservations = await Reservation.find(filter)
      .populate("rent", "title price discountPrice description imageUrls")
      .populate("pickUpLocation")
      .populate("dropOffLocation");

      reservations.forEach((reservation) => {
        (reservation.rent as any).imageUrls = (
          reservation.rent as any
        ).imageUrls.map((url: string) => {
          if (url.startsWith("http")) return url;
          return `${process.env.BASE_URL}${url}`;
        });
      });

    res.status(200).json({
      message: "Reservations retrieved successfully!",
      items: reservations,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const {
      billing,
      pickUpDate,
      dropOffDate,
      pickUpLocation,
      dropOffLocation,
      rent,
    } = req.matchedData;

    const [rentExists, pickUpLocationExists, dropOffLocationExists] =
      await Promise.all([
        Rent.findById(rent),
        Location.findById(pickUpLocation),
        Location.findById(dropOffLocation),
      ]);

    if (!rentExists || !dropOffLocationExists || !pickUpLocationExists) {
      res
        .status(400)
        .json({ message: "Invalid rent, pick-up or drop-off location" });
      return;
    }

    if (new Date(pickUpDate) > new Date(dropOffDate)) {
      res.status(400).json({ message: "Invalid date range" });
      return;
    }

    if (new Date(pickUpDate) < new Date()) {
      res.status(400).json({ message: "Pick-up date must be in the future" });
      return;
    }

    if (new Date(dropOffDate) < new Date()) {
      res.status(400).json({ message: "Drop-off date must be in the future" });
      return;
    }

    const reservationExist = await Reservation.findOne({
      rent,
      dropOffDate: { $gte: pickUpDate },
      pickUpDate: { $lte: dropOffDate },
    });

    if (reservationExist) {
      res
        .status(400)
        .json({ message: "This rental is already booked for this date" });
      return;
    }

    const rentDays = calculateDatesBetween(
      new Date(pickUpDate),
      new Date(dropOffDate)
    );
    const total = (rentExists.discountPrice || rentExists.price) * rentDays;

    const reservation = await Reservation.create({
      billingInfo: billing,
      pickUpDate,
      dropOffDate,
      pickUpLocation,
      dropOffLocation,
      rent,
      customer: req.user!._id,
      total,
    });

    res.status(201).json({
      message: "Reservation created successfully!",
      item: reservation,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = req.user!.role;
    const { status } = req.matchedData;

    if (status !== ReservationStatus.Cancelled && role !== UserRole.ADMIN) {
      res.status(403).json({ message: "You are not allowed to change status" });
      return;
    }

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }

    if (reservation.status === status) {
      res.status(400).json({ message: "Reservation already has this status" });
      return;
    }

    if (reservation.status === ReservationStatus.Cancelled) {
      res.status(400).json({ message: "Reservation already cancelled" });
      return;
    }

    if (
      reservation.status !== ReservationStatus.Pending &&
      status === ReservationStatus.Cancelled
    ) {
      res
        .status(400)
        .json({ message: "You can only cancel pending reservations" });
      return;
    }

    if (
      status === ReservationStatus.Approved &&
      reservation.status !== ReservationStatus.Pending
    ) {
      res
        .status(400)
        .json({ message: "You can only approve pending reservations" });
      return;
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json({
      message: "Reservation status changed successfully",
      item: reservation,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getPopularCars = async (req: Request, res: Response) => {
//   try {
//     const popularCars = await Rent.aggregate([
//       {
//         $lookup: {
//           from: "reservations",
//           localField: "_id",
//           foreignField: "rent",
//           as: "reservations",
//         },
//       },
//       {
//         $addFields: {
//           reservationCount: { $size: "$reservations" },  
//         },
//       },
//       {
//         $match: { reservationCount: { $gt: 1 } },  
//       },
//       {
//         $sort: { reservationCount: -1 }, 
//       },
//       {
//         $project: {
//           _id: 1,
//           title: 1,
//           price: 1,
//           discountPrice: 1,
//           imageUrls: 1,
//           reservationCount: 1,
//         },
//       },
//     ]);


//     const totalPopularCount = popularCars.length;

//     res.status(200).json({
//       message: "Popular cars retrieved successfully!",
//       totalPopularCount: totalPopularCount,
//       items: popularCars,
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


const getPopularCars = async () => {
  try {
    const popularCars = await Rent.aggregate([
      {
        $lookup: {
          from: "reservations",
          localField: "_id",
          foreignField: "rent",
          as: "reservations",
        },
      },
      {
        $addFields: {
          reservationCount: { $size: "$reservations" },  
        },
      },
      {
        $match: { reservationCount: { $gt: 0 } },  
      },
    ]);

    const totalPopularCount = popularCars.length;  
    const totalReservationCount = popularCars.reduce((sum, car) => sum + car.reservationCount, 0);  

    console.log("Total Popular Cars:", totalPopularCount);
    console.log("Total Reservation Count:", totalReservationCount);
    console.log("Popular Cars Data:", popularCars);
  } catch (e) {
    console.error("Error while fetching popular cars:", e);
  }
};


const reservationController = {
  getAll,
  create,
  changeStatus,
  getPopularCars,
};

export default reservationController;
