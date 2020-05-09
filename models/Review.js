const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
	ratedUser: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    number: Number,
    ratingUser: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
