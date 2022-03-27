const { default: mongoose } = require("mongoose");
const HttpError = require("../models/httpError");
const User = require("../models/user");
const Casting = require("../models/casting");

// let DUMMY_USERS = [
//    {
//       uid: "userId",
//       email: "test@test.com",
//       password: "password1",
//       castings: [
//          {
//             id: 1,
//             status: "applied",
//          },
//          {
//             id: 3,
//             status: "pinned",
//          },
//          {
//             id: 5,
//             status: "applied",
//          },
//       ],
//    },
// ];

const signUp = async (req, res, next) => {
   const { email, password } = req.body;

   // const userExists = DUMMY_USERS.find((u) => u.email === email);
   // if (userExists) throw new HttpError("User already exixts", 422);

   let existingUser;
   try {
      existingUser = await User.findOne({ email });
   } catch (err) {
      return next(
         new HttpError("Something failed looking for existing user", 500)
      );
   }

   // DUMMY_USERS.push({ email, password });

   const createdUser = new User({
      email,
      password,
      castings: [],
   });

   try {
      await createdUser.save();
   } catch (err) {
      return next(new HttpError("Something failed saving to DB", 500));
   }

   res.status(201).json({ user: createdUser });
};

const login = async (req, res, next) => {
   const { email, password } = req.body;
   // const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

   let existingUser;
   try {
      existingUser = await User.findOne({ email });
   } catch (err) {
      return next(
         new HttpError("Something failed looking for existing user", 500)
      );
   }

   if (!existingUser || existingUser.password !== password) {
      return next(new HttpError("Invalid credentials", 401));
   }

   // if (!identifiedUser || !identifiedUser.password === password)
   //    throw new HttpError("Invalid Credentials", 401);

   res.json({
      message: "Logged in",
      user: existingUser,
   });
};

const addCasting = async (req, res, next) => {
   const { uId, casting } = req.body;
   let identifiedUser;
   try {
      identifiedUser = await User.findById(uId);
   } catch (err) {
      next(new HttpError("Error while finding the user", 500));
   }

   if (!identifiedUser)
      return next(new HttpError("Could not find user for provided ID", 404));

   try {
      // console.log(casting);
      // console.log(mongoose.Types.ObjectId(casting._id));
      // const cId = mongoose.Types.ObjectId(casting._id);
      identifiedUser;
      const existingCast = identifiedUser.castings.find((x) => {
         return x._id.equals(casting._id);
      });

      if (existingCast && existingCast.status === casting.status)
         throw Error(`Casting already ${casting.status}`);
      else if (existingCast) {
         const idx = identifiedUser.castings.findIndex((x) => {
            return existingCast === x;
         });

         identifiedUser.castings[idx].status = casting.status;

         await identifiedUser.save();
      } else {
         identifiedUser.castings.push(casting);
         await identifiedUser.save();
      }
   } catch (err) {
      if (err.message) return next(new HttpError(err.message, 409));
      else return next(new HttpError("Could not add casting to user", 500));
   }
   res.status(200).json({ user: identifiedUser, message: "Successful" });
};

exports.signup = signUp;
exports.login = login;
exports.addCasting = addCasting;
