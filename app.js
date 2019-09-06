const express = require('express');
require("dotenv").config();
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
// const mysql = require('mysql');
const path = require('path');
const app = express();

var admin = require('firebase-admin');

const expressSession = require("express-session");

const passport = require("passport");
const Auth0Strategy = require("passport-auth0");



const {firebaseAdminConfig} = require('./credentials/keys');
admin.initializeApp(firebaseAdminConfig);

// const {authLayer} = require('./routes/orders');
const {handleAuth} = require('./routes/auth')
const {getOrders} = require('./routes/orders');
const {getProduct} = require('./routes/product');
const {getProductsForUser} = require('./routes/products');
const {getUsers} = require('./routes/users');

const authRouter = require("./auth");

// const port = 3000;

const session = {
    secret: "LoxodontaElephasMammuthusPalaeoloxodonPrimelephas",
    cookie: {},
    resave: false,
    saveUninitialized: false
};

const strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL:
        process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      /**
       * Access tokens are used to authorize users to an API 
       * (resource server)
       * accessToken is the token to call the Auth0 API 
       * or a secured third-party API
       * extraParams.id_token has the JSON Web Token
       * profile has all the information from the user
       */
      return done(null, profile);
    }
  );

if (app.get("env") === "production") {
    session.cookie.secure = true; // Serve secure cookies, requires HTTPS
}
// configure middleware
// app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
// app.use(fileUpload()); // configure fileupload


// routes for the app

// app.get('/', (req, res) => {
//     res.render('error.ejs')
// })

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

// app.get('/', authRouter);
app.get('/', handleAuth);
app.get('/orders', getOrders);
app.get('/users/:sortCriteria', getUsers);
app.get('/users/products/:userId', getProductsForUser);
// app.get('/users/product/:productId', getProduct);


// app.get('/add', addPlayerPage);
// app.get('/edit/:id', editPlayerPage);
// app.get('/delete/:id', deletePlayer);
// app.post('/add', addPlayer);
// app.post('/edit/:id', editPlayer);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
// set the app to listen on the port
app.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Running on port ${port}`);
    }
});