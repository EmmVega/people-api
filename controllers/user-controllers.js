const HttpError = require("../models/httpError");
const User = require("../models/user");

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

exports.signup = signUp;
exports.login = login;
