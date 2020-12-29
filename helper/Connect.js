const mongoose = require('mongoose');
const { logger } = require('./Winston');

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



const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}
module.exports = {
    connectDB,
    User: require('../model/User'),
    RefreshToken: require('../model/Token'),
    isValidId,
};
