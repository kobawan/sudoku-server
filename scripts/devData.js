const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("../dist/models/user").default;

mongoose
  .connect(process.env.DB_URL_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Connected to database 🚦");
  })
  .catch(error => {
    console.error(error);
  });

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

deleteData();
