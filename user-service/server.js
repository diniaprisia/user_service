const express = require("express");
const cors = require("cors");      
const app = express();
const sequelize = require("./config/database");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");

app.use(cors());                    
app.use(express.json());
app.use(userRoutes);


sequelize.sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch(err => console.log("Sync error:", err));

app.listen(4000, () => {
  console.log("User service running on port 4000");
});
