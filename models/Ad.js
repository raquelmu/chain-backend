const mongoose = require('mongoose');

const { Schema } = mongoose;

const adSchema = new Schema({
	name: String,
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
