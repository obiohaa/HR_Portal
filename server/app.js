require("dotenv").config();
require("express-async-errors");
// express

const express = require("express");
const app = express();
// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const adminAuthRouter = require("./routes/adminAuthRoute");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminUserRoute");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//others
const corOptions = {
  // origin: "http://localhost:5173",
  origin: "https://hr-portal.theplace.com.ng",
  credentials: true,
  methods: ["GET", "HEAD", "POST", "PATCH", "PUT", "DELETE", "UPDATE"],
  allowedHeader: ["Content-Type", "Authorization"],
};

app.set("trust proxy", 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 60,
//   })
// );
app.use(cors(corOptions));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

//making the public folder publicly available
app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

//app routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/adminAuth", adminAuthRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins", adminRouter);

//error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;
const start = async () => {
  try {
    const con = await connectDB(process.env.MONGO_URL);
    console.log();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...${con.connection.host}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
