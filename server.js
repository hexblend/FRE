const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Database connected'))
	.catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(() => console.log(`Server running on port ${port}.`));
