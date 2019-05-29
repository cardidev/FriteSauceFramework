//INIT//////////////////////////////////////////////////////////////////////////
const
	express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
//Config////////////////////////////////////////////////////////////////////////
app.use(express.static("public"));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
//Route////////////////////////////////////////////////////////////////////////
//ROOT///////////////////////////////////////////////
app.get("/", (req, res) => {
	res.render("pages/index.ejs");
});

//LOGIN//////////////////////////////////////////////
app.get("/login", (req,res) => {
	res.render('pages/login.ejs');
})
//New User
app.get("/newuser", (req,res) => {
	res.render('pages/subscribe.ejs')
})
//POST Route pour 
app.post("/login", (req,res) => {
	//Post to db
		//log res
		console.log(res)
	//Error check

	//redirect
	res.redirect('/user');
})

//Logged In///////////////////////////////////////////
//USERPANEL
app.get('/user', (req,res) => {
	res.render('pages/user.ejs')
})

//ORDER///////////////////////////////////////////////
app.get("/order", (req,res) => {
	res.render('pages/order.ejs')
})

//Listener///////////////////////////////////////////////////////////////////////
app.listen((process.env.IP, process.env.PORT || 3000), err =>{console.log(err)});
