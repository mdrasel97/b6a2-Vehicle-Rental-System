
import connectDB from "./config/db";
import app from "./app";
import config from "./config";

connectDB()

app.listen(config.port, () => {
  console.log(`Vehicle Rental System ${config.port}`);
});