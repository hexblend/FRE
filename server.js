const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const helmet = require('helmet'); // Disable express headers
const cors = require('cors'); // Limits requests from only specified clients
const rateLimit = require('express-rate-limit'); // Limits requests per IP
const morgan = require('morgan'); // Shows all request in the console
const cookieSession = require('cookie-session'); // Stores cookies on the client
const mongoose = require('mongoose');
const app = express();

// DB Connection
mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Database connected'))
	.catch(err => console.log(err));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 mins
	max: 100 // 100 reqs / 15 mins / IP
});
app.use(limiter);
app.use(morgan('combined'));
app.set('trust proxy', 1); // trust first proxy
const session = cookieSession({
	secret: 'helloWorld',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secureProxy: true,
		httpOnly: true,
		domain: 'http://localhost:5000/',
		expires: ''
	}
});
app.use(session);

const users = require('./routes/users');
// Routes
app.use('/api/users/', users);
// Route not found
app.use((req, res) => {
	const error = new Error(`${req.originalUrl} - Not found`);
	res.status(404);
	res.json({ error: error.message });
});

// Run server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}.`));
