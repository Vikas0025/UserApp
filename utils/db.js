const mongoose = require('mongoose');


const mongoDBConnect = () => {
    return mongoose.connect('mongodb+srv://anukontyvikas:sdnubaoj7NrXu63O@cluster0.r9bwhn3.mongodb.net/?retryWrites=true&w=majority');
}

exports.mongoDBConnect = mongoDBConnect;

