const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connectDB = async (err) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/requiment_fresher', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Connect successfully!!");
  } catch (err) {
    console.log(err);
    logger.error(error.message);
  }
};


module.exports = { connectDB };
