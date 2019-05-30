// INIT///////////////////////////////////////////////////////////////////////

const
	express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

//Config////////////////////////////////////////////////////////////////////////

//EXPRESS/////////////////////////////////////////////
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));

//MONGOOSE////////////////////////////////////////////
mongoose.connect('mongodb://localhost/FriteSauce', {
	useNewUrlParser: true
});
const db = mongoose.connection;

////Error Checking on connection
db.on('error', console.error.bind(console, 'connection error:'));

////Logging connection on local DBS
db.once('open', () => {
	console.log("Connectez a la base de donne local");
});

////DB Connection Logging
//console.log(db)

////Mongoose Schema Setup (userSchema)
const userSchema = new mongoose.Schema({
	email: String,
	username: String,
	password: String
});

////Mongoose Schema Setup (ProductSchema)
const productSchema = new mongoose.Schema({
	title: String,
	description: String,
	img: String,
	price: Number
});

////Mongoose Compile Model pour userSchema
const User = mongoose.model('User', userSchema);
////Mongoose Compile Model pour productSchema
const Product = mongoose.model('Product', productSchema);


//Route////////////////////////////////////////////////////////////////////////

//ROOT///////////////////////////////////////////////
app.get("/", (req, res) => {
	res.render("pages/index.ejs");
});

//SUBSCRIBE/////////////////////////////////////
app.get("/register", (req, res) => {
	res.render('pages/register.ejs');

});
app.post('/register', (req, res) => {
	//Recois data de l'usager qui s'inscris
	const username = req.body.username;
	const password = req.body.password;

	//Joint le schema a la let user
	const newUser = new User({
		username: username,
		password: password
	});
	//Verifie si user existe dans la db avant de sauvegarder

	//Save user a la db
	newUser.save((err, user) => {
		if (!err) {
			console.log(user);
		} else {
			console.log(err);
		}
	});

	//redirect vers le portail admin ou client
	res.render("pages/portail.ejs")
});

//LOGIN//////////////////////////////////////////////
app.get("/login", (req, res) => {
	res.render('pages/login.ejs');
});

//POST Route pour utilisateur qui essaie de login
app.post("/login", (req, res) => {

	const username = req.body.username
	const password = req.body.password
	//verifier dans dbs
	User.findOne({
		username: username
	}, (err, docs) => {
		if (!err) {
			if (docs.password === password) {
				//Rendre la page portail
				res.render('pages/portail.ejs');
			}
			else{
				res.redirect("/login");
			}
		} else {
			console.log(err)
		}
	})
});

//Logged In///////////////////////////////////////////

//USERPANEL
app.get('/portail', (req, res) => {
	res.render('pages/portail.ejs');
});

//ORDER///////////////////////////////////////////////
app.get("/order", (req, res) => {
	res.render('pages/order.ejs');
});

//Listener///////////////////////////////////////////////////////////////////////
app.listen((process.env.IP, process.env.PORT || 3000), err => {
	console.log(err);
});