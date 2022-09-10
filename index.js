require("dotenv").config();
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
//connect db
const connectDB = require("./db/connect");

//routes

app.get("/", (req, res) => {
  res.send("welcome!!");
});

app.use("/api/v1", require("./routes/patient"));
app.use("/api/v1", require("./routes/rays"));
app.use("/api/v1", require("./routes/doctorRoutes"));
app.use("/api/v1", require("./routes/adminRoutes"));
app.use("/api/v1", require("./routes/drugs"));
app.use("/api/v1", require("./routes/contactus"));
app.use("/api/v1", require("./routes/helpRoute"));
app.use("/api/v1", require("./routes/upload"));

/*  */

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //conect to db

    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
