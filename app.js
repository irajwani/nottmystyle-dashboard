const express = require('express');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
// const mysql = require('mysql');
const path = require('path');
const app = express();

var admin = require('firebase-admin');

const {getOrders} = require('./routes/index');
<<<<<<< HEAD
// const {getProduct} = require('./routes/product');
// const {getUsers} = require('./routes/users');
=======
const {getProduct} = require('./routes/product');
const {getUsers} = require('./routes/users');
>>>>>>> d1f01ef1c8e110ea33de1d80f1e051d167ca3094

const port = 3000;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
// app.use(fileUpload()); // configure fileupload

const {firebaseAdminConfig} = require('./credentials/keys');
admin.initializeApp(firebaseAdminConfig);
// routes for the app

// app.get('/', (req, res) => {
//     res.render('error.ejs')
// })

app.get('/', getOrders);
// app.get('/users', getUsers);
// app.get('/product/:productId', getProduct);


// app.get('/add', addPlayerPage);
// app.get('/edit/:id', editPlayerPage);
// app.get('/delete/:id', deletePlayer);
// app.post('/add', addPlayer);
// app.post('/edit/:id', editPlayer);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});