const express = require('express');
const Ad = require('../models/Ad');
const User = require('../models/User');

// const middleware = require('../helpers/authMiddleware');

const router = express.Router();
// router.use(middleware.checkIfUserLoggedIn);

// GET ads/all List all ads
router.get('/all', async (req, res, next) => {
	try{
		const allAd = await Ad.find()
		return res.status(200).json(allAd);
	} catch(error){
		next(error)
	}
});

// POST ads/new Create an ad
router.post('/new', async (req, res, next) => {
	const { points, _id } = req.session.currentUser;
	const { title, description, price, date, location, phone, email, status, image } = req.body;
	console.log("Este es el doy enviado:", req.body)

	try{	
		if (points > 4) {  
		const newAd = await Ad.create({
			title,
			userId: _id,
			description, 
			date: new Date(date), 
			location, 
			phone, 
			email,
			status,
			price,
			image
		})
		return res.json(newAd);
	} else{
		return res.json({error: "No tienes suficientes puntos"})
	}
	} catch(error){
		next(error)
	}
	});

// GET /ads/:id Single ad
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

//POST /ads/join/add Join an ad
router.post('/join', async (req, res, next) => {
	const { currentUser } = req.session;
	const { idAd } = req.body;
	console.log(currentUser)
	console.log(req.body)

	try{ 
		const joinAd = await Ad.findByIdAndUpdate( idAd, { $push: { joined: currentUser._id }  }, { new: true })
		return res.status(200).json(joinAd)
		// return res.json({error: "Ya hay alguien seleccionado, no puedes hacer join"}) Comprobar find selected (vacio o lleno)- retornar
	} catch(error){
		next(error)
	}
});

//POST /ads/join/remove Delete join of an ad
router.post('/:id/unjoin', async (req, res, next) => {
	const { currentUser } = req.session;
	const { idAd } = req.body;
	try{ 
		const joinAd = await Ad.findByIdAndUpdate( idAd, { $pull: { joined: currentUser._id }  }, { new: true })
		return res.status(200).json(joinAd)
	}catch(error){
		next(error)
	}
});

//POST /ads/select  Put user id of joined to selected
router.post('/:id/select', async (req, res, next) => {
	const { idAd, idUserJoined } = req.body;
	console.log(idAd, idUserJoined)
	try{
		const selectedUser = await Ad.findByIdAndUpdate( idAd, {selected: idUserJoined, status: "in_progress"}, { new: true })
		return res.status(200).json(selectedUser)
	}catch(error){
		next(error)
	}
});

//POST /ads/completed Earn points when the status is "completed" 
router.post('/:id/completed', async (req, res, next) => {
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

// POST /ads/:id Delete ad
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const deleteAd = await Ad.findByIdAndDelete(id)
		return res.json(deleteAd);
	}catch(error){
		next(error)
	}
});

// POST /ads/:id Update ad
router.put('/:id/update', async (req, res, next) => {
	const { id } = req.params;
	const {  title, description, date, location, phone, email, image } = req.body;
	console.log(req.body)
	// if 
	try {
		const adUpdated = await Ad.findByIdAndUpdate(id, { 
			title,
			description, 
			date, 
			location, 
			phone, 
			email,
			image 
		}
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
