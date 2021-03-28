var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/makewaves');  // db name

var Schema = mongoose.Schema;

var itemSchema = new Schema({
	name: {type: String, required: true, unique: true},
	quantity: {type: Number, min: 0, required: true},
	cost: { type: Number, min: 0, required: true },
});

module.exports = mongoose.model('Item', itemSchema);


