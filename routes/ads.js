/* eslint-disable no-underscore-dangle */
const express = require('express');
const Ad = require('../models/Ad');
const User = require('../models/User');

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
	const { currentUser: userId } = req.session;
	const { name, description, price, date, location, phone, email, status } = req.body;
	Ad.create({
		name,
		userId,
		description, 
		date, 
		location, 
		phone, 
		email,
		status,
		price
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



//POST /join/add' - AÑADIR UN JOIN DE UN AD

router.post('/join/add', async (req, res, next) => {
	const { currentUser } = req.session;
	const { idAd } = req.body;
	try{ 
		//if !selected findid and update si es true 200, sino error
		const joinAd = await Ad.findByIdAndUpdate( idAd, { $push: { joined: currentUser._id }  }, { new: true })
		return res.status(200).json(joinAd)
	}catch(error){
		next(error)
	}
});

//POST /join/remove' - eliminar un join de un ad

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



//POST /completed - pasar puntos cuando se cambie estado a completed


router.post('/completed', async (req, res, next) => {
	const { idAd } = req.body;
	try{
		const ad = await Ad.findByIdAndUpdate( idAd, {status: "completed"}, { new: true })
		// Aqui coger el user selected
		// Despues hacer una consulta de cuantos puntos tiene
		// sumarle 5 a los puntos que tenga y guardarlo en una variable
		// actualizar el perfil fel usuario con esa variable
		const userSelectedId = ad.selected;
		const userOwnerId = ad.userId
		const userProfile = await User.findById(userSelectedId)
		const userOwner = await User.findById(userOwnerId)
		let addPoints = userProfile.points + 5
		let subPoints = userOwner.points - 5

		 if (ad.status === "completed") {			
			const userResponse = await User.findById(userSelectedId)
			await User.findByIdAndUpdate(ad.selected, {points: addPoints} )
			console.log(userResponse, "puntos sumados")
			const ownerResponse = await User.findById(userOwnerId)
			await User.findByIdAndUpdate(ad.userId, { points: subPoints } )
			console.log(ownerResponse, "puntos restados")

			return res.status(200).json(ad)
		 } else {
		 	return res.json({error: "No se ha podido sumar puntos"})
		 }
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
