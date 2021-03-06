const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		hashedPassword: {type: String, required: true },
		name:  {type: String},
		about:  {type: String},
		location:  {type: String},
		points: { type: Number, default: 10},
		favorites: [
			{
            	type: Schema.Types.ObjectId,
            	ref: 'Ad'
        	}
		],	
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);


const User = mongoose.model('User', userSchema);

module.exports = User;
