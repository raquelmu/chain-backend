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
	const { _id } = req.session.currentUser;
	console.log(currentUser)
	// const { name, description, date, location, phone, email, status } = req.body;
	// Ad.create({
	// 	name,
	// 	userId,
	// 	description, 
	// 	date, 
	// 	location, 
	// 	phone, 
	// 	email,
	// 	status,
	// })
	// 	.then(ad => {
	// 		res.json(ad);
	// 	})
	// 	.catch(next);
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



//POST /join/add' - AÑADIR UN JOIN DE UN AD

router.post('/join/add', async (req, res, next) => {
	const { currentUser } = req.session;
	const { idAd } = req.body;
	try{ 
		const joinAd = await Ad.findByIdAndUpdate( idAd, { $push: { joined: currentUser._id }  }, { new: true })
		return res.status(200).json(joinAd)
	}catch(error){
		next(error)
	}
});

//POST /join/add' - eliminar un join de un ad

router.post('/join/remove', async (req, res, next) => {
	const { currentUser } = req.session;
	const { idAd } = req.body;
	try{ 
		const joinAd = await Ad.findByIdAndUpdate( idAd, { $pull: { joined: currentUser._id }  }, { new: true })
		return res.status(200).json(joinAd)
	}catch(error){
		next(error)
	}
});

//POST  /select - pasar el id del usuario del joined a selected

router.post('/select', async (req, res, next) => {
	const { idAd, idUserJoined } = req.body;
	try{
		const selectedUser = await Ad.findByIdAndUpdate( idAd, {selected: idUserJoined, status: "in_progress"}, { new: true })
		return res.status(200).json(selectedUser)
	}catch(error){
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

// POST /ads/:id update
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
