const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const castingRoutes = require("./routes/castings-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
   next();
});

app.use("/api/user", userRoutes);
app.use("/", castingRoutes);

app.use((err, req, res, next) => {
   if (res.headerSent) {
      return next(err);
   }
   res.status(err.code || 500);
   res.json({ message: err.message || "Ocurrió un error no identificado" });
});

mongoose
   .connect(
      "mongodb+srv://Carlos:MONGOpass2.@cluster0.w6bws.mongodb.net/peopleDB?retryWrites=true&w=majority"
   )
   .then(() => {
      app.listen(5000);
      console.log("CONECTADA A MONGODB");
   })
   .catch((err) => console.log(err));
