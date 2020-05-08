/* eslint-disable no-underscore-dangle */
const express = require('express');
const Ad = require('../models/Ad');
// const Review = require('../models/Review');
// const middleware = require('../helpers/authMiddleware');

const router = express.Router();

// router.use(middleware.checkIfUserLoggedIn);

/* GET /ad list*/
router.get('/', (req, res, next) => {
	Ad.find()
		.then(ads => {
			res.status(200).json(ads);
		})
		.catch(next);
});

// POST /ads create
router.post('/', (req, res, next) => {
	const { name } = req.body;
	Ad.create({
		name
	})
		.then(ad => {
			res.json(ad);
		})
		.catch(next);
});

// POST /ad/:id delete
router.delete('/:id', (req, res, next) => {
	const { id } = req.params;

	Ad.findByIdAndDelete(id)
		.then(ad => {
			res.json(ad);
		})
		.catch(next);
});

// POST /ad/:id update
router.put('/:id', (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;
	Ad.findByIdAndUpdate(id, {
		name
	})
		.then(adUpdated => {
			if (adUpdated) {
				res.json(adUpdated);
			} else {
				res.status(404).json('not found');
			}
		})
		.catch(next);
});

// POST /resorts/:id/review
// router.post('/:id/review', (req, res, next) => {
// 	const { id } = req.params;
// 	const { author, text } = req.body;
// 	Review.create({
// 		resort_id: id,
// 		author,
// 		text,
// 	})
// 		.then(() => {
// 			res.redirect(`/resorts/${id}/update`);
// 		})
// 		.catch(next);
// });

module.exports = router;
