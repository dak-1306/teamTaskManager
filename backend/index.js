const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const app = require("./src/app");

dotenv.config();
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
