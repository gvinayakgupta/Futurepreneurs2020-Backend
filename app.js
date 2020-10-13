const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const passport = require("passport");
// const cors = require("cors");
// const rateLimit = require("express-rate-limit");

require("dotenv").config();

////routers
const teamRoutes = require('./routes/team.routes');


const app = express();

const dbURI = process.env.dbURI;

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise; 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // initialize passport
// app.use(passport.initialize());
// app.use(passport.session());


// Allow CORS
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, Authorization,auth-token"
// 	);
// 	if (req.method === "OPTIONS") {
// 		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
// 		return res.status(200).json({});
// 	}
// 	next();
// });

// app.use(cors());
// /////Rate Limiter
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 150, // limit each IP to 100 requests per windowMs
// });


app.use('/team', teamRoutes);
// app.use('/event',eventRoutes)
// app.use('/certificate', certificateRoutes)
// //  apply to all requests
// app.use(limiter);

//route not found
app.use((req, res, next) => {
	const error = new Error("Route not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
