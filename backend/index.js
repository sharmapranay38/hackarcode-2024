const express = require("express");
const cors = require("cors");
const user = require("./routes/user");
const courseRouter = require("./routes/course");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", user);
app.use("/api/v1/course", courseRouter);

app.listen(9000);
