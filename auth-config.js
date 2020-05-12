const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcryptjs');

function authConfig(passport) {
	const authenticateUser = async (email, password, done) => {
		const user = await User.findOne({ email });
		if (!user) {
			return done(null, false, { message: 'Incorrect email.' });
		}
		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'Incorrect password.' });
			}
		} catch (err) {
			return done(err);
		}
	};

	passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
}
module.exports = authConfig;
