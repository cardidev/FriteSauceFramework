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
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE////////////////////////////////////////////
mongoose.connect('mongodb://localhost/FriteSauce', {useNewUrlParser: true});
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
const Product =  mongoose.model('Product', productSchema);


//Route////////////////////////////////////////////////////////////////////////

//ROOT///////////////////////////////////////////////
app.get("/", (req, res) => {
	res.render("pages/index.ejs");
});

//LOGIN//////////////////////////////////////////////
app.get("/login", (req,res) => {
	res.render('pages/login.ejs');
});
//New User
app.get("/register", (req,res) => {
	res.render('pages/register.ejs');

});
app.post('/register', (req,res) => {
	//Recois data de l'usager qui s'inscris
	let username = req.body.username;
	let password = req.body.password;
	
	//Joint le schema a la let user
	let newUser = new User({username: username, password: password});
	
	//Save user a la db
	newUser.save( (err, user) => {
		if(!err){
			console.log(user);
		}
		else{
			console.log(err);
		}
	});

	//redirect vers le portail admin ou client
	res.render("pages/portail.ejs")
});
//POST Route pour utilisateur qui s'enregis
app.post("/login", (req,res) => {
	//

	//Error check

	//redirect
	res.redirect('/user');
});

//Logged In///////////////////////////////////////////

//USERPANEL
app.get('/user', (req,res) => {
	res.render('pages/user.ejs');
});

//ORDER///////////////////////////////////////////////
app.get("/order", (req,res) => {
	res.render('pages/order.ejs');
});

//Listener///////////////////////////////////////////////////////////////////////
app.listen((process.env.IP, process.env.PORT || 3000), err =>{console.log(err);});
