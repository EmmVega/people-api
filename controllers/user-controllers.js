const HttpError = require("../models/httpError");

let DUMMY_USERS = [];

const signUp = (req, res, next) => {
   const { email, password } = req.body;

   const userExists = DUMMY_USERS.find((u) => u.email === email);
   if (userExists) throw new HttpError("User already exixts", 422);

   DUMMY_USERS.push({ email, password });

   res.status(201).json(DUMMY_USERS);
};

const login = (req, res, next) => {
   const { email, password } = req.body;

   const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
   if (!identifiedUser || identifiedUser.password === password)
      throw new HttpError("Invalid Credentials", 401);

   res.json({
      message: "Logged in",
      user: identifiedUser,
   });
};

exports.signup = signUp;
exports.login = login;
