const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

require('dotenv').config();

const dbPath = process.env.MONGODB_URI;

mongoose
	.connect(dbPath, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`conected to ${dbPath}`);
	})
	.catch(error => {
		console.error(error);
	});

const authRouter = require('./routes/auth');
const demoRouter = require('./routes/demo');
const adsRouter = require('./routes/ads');
const userRouter = require('./routes/user')


const app = express();

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'https://chain-app-frontend.herokuapp.com');
	res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			ttl: 24 * 60 * 60, // 1 day
		}),
		secret: process.env.SECRET_SESSION,
		resave: true,
		saveUninitialized: true,
		name: 'ironhack',
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
		},
	})
);

app.use('/', authRouter);
app.use('/ads', adsRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	res.status(404).json({ code: 'not found' });
});

app.use((err, req, res, next) => {
	// always log the error
	console.error('ERROR', req.method, req.path, err);

	// only render if the error ocurred before sending the response
	if (!res.headersSent) {
		res.status(500).json({ code: 'unexpected', error: err });
	}
});

module.exports = app;
