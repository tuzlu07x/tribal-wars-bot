import winston from "winston"

export default function getLog() {
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  return logger;
}