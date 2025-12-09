import express from "express";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";
import authRouter from "./routes/authRouter.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("OK");
});

//TODO: remove this test route later
app.get("/test-auth", authMiddleware, (req, res) => {
  res.send(`Authenticated user ID: ${req.user?.id}`);
});

app.use(errorHandlingMiddleware);

export default app;
