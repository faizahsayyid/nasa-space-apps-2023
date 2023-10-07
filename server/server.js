const dotenv = require("dotenv");
dotenv.config();

var cors = require("cors");
const express = require("express");
const projectRoutes = require("./routes/projects");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/project", projectRoutes);

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
