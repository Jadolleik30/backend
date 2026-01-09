const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const mealsRoutes = require("./routes/meals");
const goalsRoutes = require("./routes/goals");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/meals", require("./routes/meals"));
app.use("/goals", require("./routes/goals"));
n 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
