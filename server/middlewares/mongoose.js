const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch((e) => {
    console.log(e);
  });

module.exports = mongoose;
