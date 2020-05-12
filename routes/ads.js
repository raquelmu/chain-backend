/* eslint-disable no-underscore-dangle */
const express = require('express');
const Ad = require('../models/Ad');
// const Review = require('../models/Review');
// const middleware = require('../helpers/authMiddleware');

const router = express.Router();

// router.use(middleware.checkIfUserLoggedIn);

/* GET /ad list*/
router.get('/all', (req, res, next) => {
	console.log('request from postman')
	Ad.find()
		.then(ads => {
			res.status(200).json(ads);
		})
		.catch(next);
});

// POST /ads create
router.post('/new', (req, res, next) => {
	const { name, userId, description, date, location, phone, email } = req.body;
	Ad.create({
		name,
		userId,
		description, 
		date, 
		location, 
		phone, 
		email,
	})
		.then(ad => {
			res.json(ad);
		})
		.catch(next);
});
// GET /ads/:id single ad



router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const singleAd = await Ad.findById(id)
		if (singleAd) {
			return res.json(singleAd);    
		} else { 
			return res.json({error: "No se ha podido encontrar el Ad"})
		}
	} catch(error){
		next(error)
	}
});





// POST /ads/:id delete
router.delete('/:id', (req, res, next) => {
	const { id } = req.params;

	Ad.findByIdAndDelete(id)
		.then(ad => {
			res.json(ad);
		})
		.catch(next);
});

// POST /ad/:id update
router.put('/:id', async (req, res, next) => {
	const { id } = req.params;
	const {  name, userId, description, date, location, phone, email } = req.body;
	try {
		const adUpdated = await Ad.findByIdAndUpdate(id, { 
			name,
			userId,
			description, 
			date, 
			location, 
			phone, 
			email, }
			)

		if (adUpdated) {
			return res.json(adUpdated);
			} else {
				return res.json('not updated');
			}
		}catch(error){
			next(error)
		}
});

module.exports = router;
