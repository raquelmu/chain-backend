const mongoose = require('mongoose');

const { Schema } = mongoose;

const adSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId, 
		ref:"User"
	},
	// image: {
	// 	type: String,
	// },
	description: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
	},
	email: {
		type: String,
		required: true
	},
	date: {
		type: Date,
	},
	location: {
		type: String,
		required: true
	},
	
	// tags: {
	// 	type: Array,
	// },
	// points: {
	// 	type: Number,
	// },
	// status: {}
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
