const Review = require('../models/Review');

// //POST /:id - Puntuar user

router.post('/rating', async (req, res, next) => {
	const { number, ratingUser, ratedUser } = req.body;
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

//findbyid review de id (login)