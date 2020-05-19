const express = require('express');
const Review = require('../models/Review');
const User = require('../models/User');
const router = express.Router();

//POST /:id/rating  New review
router.post('/:id/rating', async (req, res, next) => {
	const { number, ratingUser } = req.body;
	const ratedUser = req.params.id;
	console.log (number, ratingUser, ratedUser)
	try{
		const review = await Review.create({number, ratingUser, ratedUser});
		if (review){
			return res.json(review);
		} else {
			return res.json('no hay review');
		}
	}catch(error){
		next(error)
	}
});

//GET /:id/rating Search all review (by user Id)
router.get('/:id/rating', async (req, res, next) => {
	const userId = req.params.id;
	console.log(userId)
	try {
		const number = await Review.find({ratedUser: userId});
		return res.status(200).json(number)
	} catch(error){
		next(error)
    }
});



//GET /favorites/all See all favorites
router.get('/favorites/all', async (req, res, next) => {
	const { currentUser } = req.session;
	try {
		if (currentUser) {
			const { favorites } = await User.findById( currentUser._id )
			return res.status(200).json(favorites);
		} else {
			return res.status(401).json( { error: " No hay usuario en la sesión" });
		}
	} catch(error) {
		next(error)
	}
});

//POST /favorites/add Save a favorite
router.post('/favorites/add', async (req, res, next) => {
	const { currentUser } = req.session;
	const { adsId } = req.body;
	try{ 
		const userFav = await User.findByIdAndUpdate( currentUser._id, { $push: { favorites: adsId }  }, { new: true })
		return res.status(200).json(userFav)
	}catch(error){
		next(error)
	}
});

//POST /favorites/remove Delete a favorite
router.post('/favorites/remove', async (req, res, next) => {
	const { currentUser } = req.session;
	const { adsId } = req.body;
		try{
			const userFav = await User.findByIdAndUpdate( currentUser._id, { $pull: {favorites: adsId} }, {new: true} )
			return res.status(200).json(userFav)
		}catch(error){
			next(error)
		}
});

module.exports = router;
