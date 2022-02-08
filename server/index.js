const express = require("express");
const app = express();
const dotenv = require("dotenv");
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");
const connectDB = require("./config/db-config.js");
// const cors = require("cors");
const port = process.env.PORT || 9000;
// routers
const authRouter = require("./routes/authRoutes.js");
const jobsRouter = require("./routes/jobsRoutes.js");

dotenv.config();

//************ Middleware */
app.use(express.json());
// app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () => {
      console.log(`Server is running on port:  ${port}.....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
