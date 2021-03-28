var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cars4sale');  // db name

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    cid: { type: Number, unique: true },
    year: { type: Number },
    make: { type: String },
    model: { type: String },
    miles: { type: Number },
    price: { type: Number, min: 0, required: true },
    dealer_id: { type: String }
});

module.exports = mongoose.model('Cars', itemSchema);


