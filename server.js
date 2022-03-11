const express = require("express");
const castingRoutes = require("./routes/castings-routes");

const app = express();

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
   next();
});

app.use("/", castingRoutes);

app.listen(5000);
