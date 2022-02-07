const express = require("express");
const app = express();
const dotenv = require("dotenv");
const notFoundMiddleware = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");
const connectDB = require("./config/db-config.js");
const port = process.env.PORT || 9000;

dotenv.config();

//************ Middleware */
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// routes
app.get("/", (req, res) => {
  res.send("Welcome!");
});

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


start()