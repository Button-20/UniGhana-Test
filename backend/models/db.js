const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/UniGhanaDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB connection succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

require("./user.model");
