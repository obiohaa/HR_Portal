// logger.js
const winston = require("winston");
const path = require("path");
const DailyRotateFile = require("winston-daily-rotate-file");

// Create logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    // 🔥 Daily rotating log for ALL logs
    new DailyRotateFile({
      dirname: path.join(__dirname, "../logs"),
      filename: "%DATE%-combined.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d", // keep logs for 14 days
    }),

    // 🔥 Daily rotating log for ERROR logs only
    new DailyRotateFile({
      dirname: path.join(__dirname, "../logs"),
      filename: "%DATE%-error.log",
      level: "error",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// Handle exceptions (crashes)
logger.exceptions.handle(
  new DailyRotateFile({
    dirname: path.join(__dirname, "../logs"),
    filename: "%DATE%-exceptions.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  })
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (ex) => {
  throw ex;
});

// HTTP REQUEST LOGS (MORGAN) — DAILY ROTATION
const httpLogger = new DailyRotateFile({
  dirname: path.join(__dirname, "../logs"),
  filename: "access-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

// Add HTTP logger to Winston
logger.add(httpLogger);

// Morgan needs a stream with write()
logger.stream = {
  write: (message) => {
    logger.info(message.trim()); // Send logs to Winston
  },
};

// Console log only in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
