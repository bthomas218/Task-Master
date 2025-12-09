import express from "express";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("OK");
});

app.use(errorHandlingMiddleware);

export default app;
