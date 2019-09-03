const express = require('express');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
// const mysql = require('mysql');
const path = require('path');
const app = express();

var admin = require('firebase-admin');

const {firebaseAdminConfig} = require('./credentials/keys');
admin.initializeApp(firebaseAdminConfig);

const {getOrders} = require('./routes/index');
const {getProduct} = require('./routes/product');
const {getProductsForUser} = require('./routes/products');
const {getUsers} = require('./routes/users');

// const port = 3000;

// configure middleware
// app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
// app.use(fileUpload()); // configure fileupload


// routes for the app

// app.get('/', (req, res) => {
//     res.render('error.ejs')
// })

app.get('/', getOrders);
app.get('/users/:sortCriteria', getUsers);
app.get('/users/products/:userId', getProductsForUser)
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