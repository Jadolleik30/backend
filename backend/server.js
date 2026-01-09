const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const mealsRoutes = require("./routes/meals");
const goalsRoutes = require("./routes/goals");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.use("/auth", authRoutes);
app.use("/meals", mealsRoutes);
app.use("/goals", goalsRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
