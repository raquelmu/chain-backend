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


// GET /:id - find id para guardar number?

    // router.get('/rating', async (req, res, next) => {
    //  const { id } = req.params;
    //  const { number } = req.body;
    //  try {
    //      const rate = await Review.findById(id);
    //      if (rate) {
    //          // .push
    //          return res.json(rate)
    //      } else {
    //          return res.json({error: "No se ha podido encontrar el review"})
    //      }
    //  } catch(error){
    //      next(error)
    //  }
    // });