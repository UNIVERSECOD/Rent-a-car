import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../mongoose/schemas/user";
import { comparePassword } from "../utils/bcrypt";

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id).select(
      "-password -__v -resetPasswordToken -resetPasswordTokenExpires"
    );
    if (!user) {
      return done(null, false);
    }

    done(null,
      {
        ...(user.toObject() ?? {} ),
        _id:user._id.toString(),
        resetPasswordTokenExpires: undefined,
        password: undefined,
        resetPasswordToken: undefined,
        createdAt: user.createdAt?.toString(),
        updatedAt: user.updatedAt?.toString(),
     }
    );
  } catch (error) {
    done(error);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Invalid Credentials!" });
        }

        if (!comparePassword(password, user.password as string)) {
          return done(null, false, { message: "Invalid Credentials!" });
        }

        return done(null, {
          ...(user.toObject() ?? {} ),
          _id:user._id.toString(),
          resetPasswordTokenExpires: undefined,
          password: undefined,
          resetPasswordToken: undefined,
          createdAt: user.createdAt?.toString(),
          updatedAt: user.updatedAt?.toString(),
        });
      } catch (error) {
        done(error);
      }
    }
  )
);
