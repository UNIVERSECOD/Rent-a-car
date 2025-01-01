import dotenv from 'dotenv';
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import { createServer } from "node:http";
import passport from "passport";
import express from "express";
import cors from "cors";

import "./config/db"
import "./config/auth-strategy"


// import { initalizeSocket } from "./socket/index.mjs";
import authRoutes from "./routes/auth";

// import commentRoutes from "./routes/comment.mjs";
// import userRoutes from "./routes/user.mjs";
// import friendShipRoutes from "./routes/friendship.mjs";
// import conversationRoutes from "./routes/conversation.mjs";

const app = express();
dotenv.config();

 cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
  ;
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
  );
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes)

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
