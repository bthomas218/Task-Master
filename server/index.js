import express from "express";

const PORT = process.env.port || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ONLINE");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
