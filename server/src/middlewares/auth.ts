import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser, UserRole } from "../types/user";

export const authorize = (options?: {isAdmin?: boolean}) => {
  const isAdmin = !!options?.isAdmin;
  return async (req: Request, res:Response, next:NextFunction) => {
    try {
      if (!req.isAuthenticated()) {
       res.status(401).json({ message: "Unauthorized!" });
       return;
      }

      if (isAdmin && req.user?.role !== UserRole.ADMIN){
        res.status(403).json({ message: "Contact with Admin!" });
        return;
      }

      next();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error!" });
    }
  };
};

export const authenticate = (req: Request, res:Response, next:NextFunction) =>
  passport.authenticate("local", function (err: Error, user:IUser, info: { message?: string}) {
    if (err) {
     res.status(500).json({ message: "Internal server error!" });
     return;
    }
    if (info?.message || !user) {
     res.status(401).json({ message: info?.message || "Unauthorized!" });
     return;
    }

    req.login(user, function (err) {
      if (err) {
        res.status(500).json({ message: "Internal server error!" });
        return;
      }
      next();
    });
  })(req, res, next);
