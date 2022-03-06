const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const lessonRouter = require("./routes/lessons");
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// connect to DB
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("DB connected!");
});

app.use(cors());
app.use(express.json());

app.use("/v1/lessons", lessonRouter);
app.use("/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server is running...");
});
