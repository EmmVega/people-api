const { default: mongoose } = require("mongoose");
const HttpError = require("../models/httpError");
const User = require("../models/user");
const Casting = require("../models/casting");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

   let hashedPassword;
   try {
      hashedPassword = await bcrypt.hash(password, 12);
   } catch (err) {
      return next(
         new HttpError("Could not create hashed pass, try again", 500)
      );
   }
   const createdUser = new User({
      email,
      password: hashedPassword,
      castings: [],
   });

   try {
      await createdUser.save();
   } catch (err) {
      return next(new HttpError("Something failed saving to DB", 500));
   }

   let token;
   try {
      token = jwt.sign(
         { userId: createdUser._id, email: createdUser.email },
         "SUPERSECRET_DONT_SHARE",
         { expiresIn: "1h" }
      );
   } catch (err) {
      return next(new HttpError("Something failed creating token", 500));
   }

   res.status(201).json({ user: createdUser, token: token });
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

   if (!existingUser) {
      return next(new HttpError("Invalid credentials", 401));
   }

   let isValidPassword = false;

   try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
   } catch (err) {
      return next(
         new HttpError("Something went wrong comparing password", 500)
      );
   }

   if (!isValidPassword) {
      return next(new HttpError("Invalid credentials", 401));
   }
   // if (!identifiedUser || !identifiedUser.password === password)
   //    throw new HttpError("Invalid Credentials", 401);

   let token;
   try {
      token = jwt.sign(
         { userId: existingUser._id, email: existingUser.email },
         "SUPERSECRET_DONT_SHARE",
         { expiresIn: "1h" }
      );
   } catch (err) {
      return next(new HttpError("Something failed creating token", 500));
   }

   res.json({
      message: "Logged in",
      user: existingUser,
      token: token,
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

const addCv = async (req, res, next) => {
   if (!req.file) return next(new HttpError("no hay file asegun", 500));

   const uId = req.body.uId;
   const cv = req.file.path;

   let identifiedUser;
   try {
      identifiedUser = await User.findById(uId);

      identifiedUser.cv = cv;
      identifiedUser.save();
   } catch (err) {
      return next(new HttpError("something failled identifying uid"));
   }

   res.status(200).json({ message: "Saved Successfully" });
};

const getCv = async (req, res, next) => {
   // if (!req.file) return next(new HttpError("no hay file asegun", 500));

   const { uId } = req.params;

   let identifiedUser;
   try {
      identifiedUser = await User.findById(uId);
      // res.status(200).json({ cv: identifiedUser.cv });
   } catch (err) {
      return next(new HttpError("something failled identifying uid"));
   }

   res.download(identifiedUser.cv);
};

exports.signup = signUp;
exports.login = login;
exports.addCasting = addCasting;
exports.addCv = addCv;
exports.getCv = getCv;
