import express from "express";
import router from "./routes";
import cors from "cors";
const app = express();
app.use(cors());

app.use(express.json());
app.use("/", router);

app.listen(1338, () => {
  console.log("Server is running at port 1338");
});

module.exports = app;
