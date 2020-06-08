# Log book CDA 600 - Vlad Bibire

### Task Planning

#### Review Report

- [x] Research a problem statement and a research question
- [x] Research a possible solution
- [x] Create a survey to see the viability of the solution
- [x] Analyze the results
- [x] Research legal and ethical issues to establish a privacy policy
- [x] Come up with a list of technologies to in the creation of the app
- [x] Perform technical test with technologies to ensure their use
- [x] Create a deadline for each of the following phases
- [x] Security Literature Review

#### Design Phase

- [x] Ideas into high-fidelity designs
- [x] Create a style guide and design system that the project will be guided
      by
- [x] Create a platform logo

#### Development Phase

- [x] Setup a basic Node.js/Express server
- [x] Setup all the security measurements in a case of an Express
      application
- [x] Setup a database connection
- [x] Create a database schema for the entire app based on models
- [x] Create the user model
- [x] Setup the authentication system with Passport
- [x] Create a CRUD system for posting
- [x] Create a CRUD system for profiles
- [x] Create the ‘add to favourites’ system for employers
- [x] Offer the possibility of deleting a profile
- [x] Offer the possibility of making the account ‘inactive’
- [x] Create the interview-process system
- [x] Refactoring/Restructuring the whole Web Service
- [x] Start working on the client side - Project setup
- [x] Code a style guide in a component based manner
      15
- [x] Put together all the components for a static view
- [x] Link each component with data from MongoDB using HTTP Requests
- [x] Add media queries for app responsiveness Final summative Report

#### Final Summative Report

- [x] Explain and document the entire process from start to finish [100
      hours]

### Tech Notes

#### Express and DOTENV Integration

Dotenv is an npm package used to hide very important variables. The process starts with creating a `.env` file inside of the `root` folder of the app.

Then this file needs to be added to `.gitignore` so that when the project is uploaded to a code hosting website like github, it won't be public to anyone.

Also, there needs to be another `.env.example` file which includes all the variables needed for the running the app, however no values should be inserted.

Every variable can be accessed using `process.env.VAR_NAME` inside of any file that includes the dotenv package.

```
const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
```

#### Mongoose

Mongoose is a package that provides a clean integration between an Express app that _communicates_ with a MongoDB database. It can be integrated with async/await functions since it takes time for a process to be done.

How to do a request:

```
const Order = require('../models/Order');

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.json({ success: 'Fetched all orders', orders });
    } catch (error) {
        next(error);
    }
};
```

How to create a model:

```
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    festival_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Festival'
    },
    name: {
        type: String,
        required: true
    },
    tickets_number: {
        type: String,
        required: true
    }
}, {timestamps: true});

const orderMOdel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
```

### Security

#### CORS

Cors is a package that makes the API made with Express to accept request from a single Front-End URL, making it this way be private from any other requests.

It can be activated as a middleware:

```
app.use(
    cors({ origin: process.env.CORS_ORIGIN });
);
```

#### Morgan

Morgan is an NPM packages that makes the requests to be shown in the console of the server. It makes this way monitoring easier in the case of an attack. It can show: IP Address, Operating system, Browser name, and others.

It can be activated as a middleware:

```
app.use(morgan('combined'));
```

#### Express-rate-limit

Rate Limit is an NPM package that sets a limit on how many requests to the API an IP address can do per hour. This way, there is a small protection agains DDOS attacks.

```
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 mins
	max: 300, // 100 reqs / 15 mins / IP
});
```

#### Helmet

Helmet is avery useful NPM Package that disables the browser from showing what technology has been used in the backend (i.e. express) in the headers.

It can be activated as a middleware:

```
app.use(helmet());
```

### Authentication

#### Passport

Passport is an npm package, that enables authentication to an API based on strategies. The strategies can be for logging in with a tradition email and passport, but also it has included OAUTH Strategies for services like Google, Facebook, etc.

Email/Passport Strategy:

```
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
```

#### Bcrypt

Bcrypt is an NPM package used to hash passwords and compare a hash password with a non hashed password based on the same algorithm.

```
const hashedPassword = await bcrypt.hash(password, 10);
```

#### Register Controller

Logic used to register a user since Passport only handles the login

```
const createUser = async (req, res, next) => {
	const { full_name, email, password, type, company } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		let user;
		if (company)
			user = new User({ full_name, email, password: hashedPassword, type, company });
		else user = new User({ full_name, email, password: hashedPassword, type });

		const savedUser = await user.save();
		return res.json({
			message: 'Success! User added successfully',
			savedUser,
		});
	} catch (err) {
		const error = new Error('User could not be created.');
		error.error = err;
		return next(error);
	}
};
```

### REDUX

Redux is a node package manager used for creating a global state over the React application.
Having a global state is a powerful time saver because it can be accesed with ease from any child component.

Redux introduces concepts like:

1. Store
2. Dispatching
3. Action Type
4. Action Creator
5. Reducer

The Store holds all the appliction's state. It needs a reducer.

Dispatch is the method used to call for a state change.

Action Type is a simple constant that holds the name the Action Creator.

Action Creator is a method that lets the reducer know what action we want to perform.

Reducer is the main piece. Here is dictated the logic for changing the state.

Payload is the new state that needs to be passed.

#### The Proccess

We first create an Action Type which is just a constant.

Then we create an Action Creator based on the imported type. In the return we pass the Payload(new state).

We can now create the initial state inside the Reducer and update it with the Payload on the Action Type.

Basically, everytime we want to change the state, we dispatch an action, which will trigger the reducer logic to change the state.

#### React-Redux

React, however, without react-redux npm module, would not be able to communicate to the Store.

mapStateToProps() is used everytime the reducer's state is needed.

mapDispatchToProps() is used everytime the state needs to be changed.

connect() Link the Componenet with mapStateToProps() and mapDispatchToProps().

### Design

#### Struggles

The logo was made first. It started from a 10 drawings in a notebook, then it was moved into Adobe Illustrator for vectorising the drawing and then moved into Adobe Photoshop for coloring. The whole process took 2 hours and a half.

Once presented to a real designer, it needed some tweaks. However those tweaks could not be made based on the methods used to vectorise the sketches. In the end, the logo was redone from scratch taking another 3 hours.

_“It looks great and professional however the curvature of the ‘R’ is not
perfectly round in the middle and also the bottom line of the letter ‘E’
doesn’t have a symmetric size: it starts narrower and it ends up thicker.
Slight adjustments and it can be perfect.”_ - Diana Apostu, Graphic Designer

#### The Goods

Everything was done using components and named layers so that in the Development Phase same naming schemes would be used for Colors for example and also same Components will be build.

A style guide is made which after coding should look the same and then each element in the style guide will be implemented throughout the whole app.

### Development Phase

### Updating the user

1. While all the other code inside of the controllers was relatively small, the code for updating the user was about 300 lines of code. There were 3 types of fields that needed to be checked and updated inside of the database: Single Object Fields, Nested Object Fields, Fields with Subdocuments.
2. After a lot of time was dedicating just to make it work, another problem was encountered which was about the fact that the whole user object with all the data completed needs to be sent back to the server in order for a complete update to be performed. The solution was to check using if statements each and every field.
3. Code refactoring was a big part of the process, if not refactored, the code would require a lot of attention to develop a new feature based on it.

### Search

1. The search was first develop to accept a single job title. But then the logic needed to be done to accept a maximum of 3 job titles. It was a multi-step process to develop the search feature.
2. Later on in the front end, the design was made for a simple text input for when a user tries to search candidates. But the logic in the backend was done using tags. So a new component had to be made that accepted tags functionality and also a request to an external api is made everytime the user enters a new letter so that the website gives back live results.

### Auth Problems

1. An auth problem was encountered when a user would login and then refreshed the page, the session would not be kept. The solution was to create a special route `/check-session` that would verify in the backend if a sesssion exists and if it does, then send the whole user object back.

2. Another problem was when multiple users were trying to log in at the same time. The current logic allowed only one user at the time to log in. And so the solution was to store multiple sessions in the database. This way even if the server crashes, the sessions would be kept and the user would be automatically logged in.

### Avatars

Avatars are stored using an external API that needed to be researched in order to implement all the functionality. Esentially, if somebody bad intended comes and uploads a very big file, the external api would hold all the pressure, letting every user on the FRE app to use it noramlly.

### Search Strategy

A later on search strategy was implemented. FRE doesn't want any candidate to appear in the serach results if they have not updated their profile. This way employers would see a list of curated candidates, ready to be hired, rather than a list of empty profiles.

## Optional Features

### Messaging

Messaging was one of the optional features that was implemented so that the users could comunicate simpler without sending email and going outside of the app. However, the messages are not in real-time, using sockets, they are sent just like emails, but they look like real-time ones. A posibility of future update is left open.