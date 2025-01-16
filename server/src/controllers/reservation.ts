import { Request, Response } from "express";
import Reservation from "../mongoose/schemas/reservation";
import Rent from "../mongoose/schemas/rent";
import Location from "../mongoose/schemas/location";
import { calculateDatesBetween } from "../utils/reservation";

const getAll = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const filter: Record<string, any> = {};
    if (user!.role !== "admin") {
      filter.customer = user!._id;
    }

    const reservations = await Reservation.find(filter)
      .populate("rent", "title price discountPrice description imgUrls")
      .populate("pickUpLocation")
      .populate("dropOffLocation");

      reservations.forEach((reservation) => {
        (reservation.rent as any).imageUrls = (
          reservation.rent as any
        ).imageUrls.map((url:string) => `${process.env.BASE_URL}.${url}`)
      })

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

    if (new Date(pickUpDate) < new Date(dropOffDate)) {
      res.status(400).json({ message: "Invalid date range" });
      return;
    }

    if (new Date(pickUpDate) > new Date()) {
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

const reservationController = {
  getAll,
  create,
};

export default reservationController;
