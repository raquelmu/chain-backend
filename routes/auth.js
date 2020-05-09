const express = require('express');
const bcrypt = require('bcrypt');
const { checkUsernameAndPasswordNotEmpty, checkIfLoggedIn } = require('../middlewares');
const User = require('../models/User');
const bcryptSalt = 10;
const router = express.Router();

// GET /:id anyProfile
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

// PUT /:id - Editar perfil del usuario

router.put('/:id', checkIfLoggedIn, async (req, res, next) => {
	const { id } = req.params;
	const { username } = req.body;	
	try {
		const profileUpdated = await User.findByIdAndUpdate (id, { username }, {new: true}) 
		if (profileUpdated){
			return res.json(profileUpdated);
			} else {
				return res.json('not updated');
			}
		}catch(error){
			next(error)
		}
});

// DELETE /:id - Eliminar cuenta

router.delete('/:id', (req, res, next) => {
	const { id } = req.params;

	User.findByIdAndDelete(id)
		.then(user => {
			res.json(user);
		})
		.catch(next);
});

// --- AUTENTICACIÓN ---

//GET /whoami - comprueba el current user

router.get('/whoami', (req, res, next) => {
	if (req.session.currentUser) {
		res.status(200).json(req.session.currentUser);
	} else {
		res.status(401).json({ code: 'unauthorized' });
	}
});

//POST /signup Crear un usuario

router.post('/signup', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
	const { username, password } = res.locals.auth;
	try {
		const user = await User.findOne({ username });
		if (user) {
			return res.status(422).json({ code: 'username-not-unique' });
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

// POST /login - buscar usuario creado en DB

router.post('/login', checkUsernameAndPasswordNotEmpty, async (req, res, next) => {
	const { username, password } = res.locals.auth;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ code: 'not-found' });
		}
		if (bcrypt.compareSync(password, user.hashedPassword)) {
			req.session.currentUser = user;
			return res.json(user);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch (error) {
		next(error);
	}
});
//GET /logout Destruir sesion actual

router.get('/:id/logout', (req, res, next) => {
	//const { id } = req.params;
	req.session.destroy(err => {
		if (err) {
			next(err);
		}
		return res.status(204).send();
	});
});



module.exports = router;
