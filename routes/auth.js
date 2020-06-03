const express = require('express');
const bcrypt = require('bcrypt');
const { checkUsernameAndPasswordNotEmpty, checkIfLoggedIn } = require('../middlewares');
const User = require('../models/User');

const bcryptSalt = 10;
const router = express.Router();

//AUTH
//GET /whoami Check current user in session
router.get('/whoami', (req, res, next) => {
	if (req.session.currentUser) {
		res.status(200).json(req.session.currentUser);
	} else {
		res.status(401).json({ code: 'unauthorized' });
	}
});

//POST /signup New user
router.post('/signup', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
	const { username, password } = res.locals.auth;
	try {
		const user = await User.findOne({ username });
		if (user) {
			return res.status(422).json({ code: 'This account already exists' });
		}
		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashedPassword = bcrypt.hashSync(password, salt);

		const newUser = await User.create({ username, hashedPassword });
		req.session.currentUser = newUser;
		return res.json(newUser);
	} catch (error) {
		next(error);
	}
});

//POST /login Search user in DB
router.post('/login', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
	const { username, password } = res.locals.auth;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ code: 'Username is incorrect' });
		}
		if (bcrypt.compareSync(password, user.hashedPassword)) {
			req.session.currentUser = user;
			console.log(req.session.currentUser)
			return res.status(200).json(user);
		}
		return res.status(404).json({ code: 'Password is incorrect' });
	} catch (error) {
		next(error);
	}
});

//GET /logout Destroy session
router.get('/logout', (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err);
		}
		return res.status(204).send();
	});
});

//GET /:id See any profile
router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const anyProfile = await User.findById(id)
		if (anyProfile) {
			return res.json(anyProfile)
		} else { 
			return res.json({error: "No se ha podido encontrar el Profile"})
		}
	} catch(error){
		next(error)
	}
});

//PUT /:id Edit user's info
router.put('/:id/update', checkIfLoggedIn, async (req, res, next) => {
	const { id } = req.params;
	const { name, profile_image, about, location } = req.body;	
	try {
		const profileUpdated = await User.findByIdAndUpdate (id, { name, profile_image, about, location }, {new: true}) 
		if (profileUpdated){
			return res.json(profileUpdated);
			} else {
				return res.json('not updated');
			}
		}catch(error){
			next(error)
		}
});

//DELETE /:id Delete user
router.delete('/:id', (req, res, next) => {
	const { id } = req.params;
	User.findByIdAndDelete(id)
		.then(user => {
			res.json(user);
		})
		.catch(next);
});


module.exports = router;
