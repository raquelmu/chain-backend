const mongoose = require('mongoose');

const { Schema } = mongoose;

const adSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId, 
		ref:"User"
	},
	image: {
		type: String,
	},
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
	joined: [
		{
		type: Schema.Types.ObjectId,
		ref: 'User'
		}
	],
	selected: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	status: {
		type: String, 
		enum:["available", "in_progress", "completed"],
		default: "available"
	},
	price: {
		type: Number,
		default: 5
	},
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
