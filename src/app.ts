import express from "express";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";

const app = express();

app.get("/", (req, res) => {
  throw new Error("Something went wrong!"); // this is just to test the error handling middleware
  res.send("OK");
});

app.use(errorHandlingMiddleware);

export default app;
