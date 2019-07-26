// var express = require('express');
// var router = express.Router();
var admin = require('firebase-admin');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   //get orders data and pass it here
//   res.render('index', { title: 'NottMyStyle Dashboard' });
// });

module.exports = {
  getOrders: (req, res) => {
    admin.database().ref('/Users').once('value', (snapshot) => {
      let users = snapshot.val(), orders = [], currentNotificationsObject;
      Object.values(users).forEach((user, index) => {

        if(user.notifications) {
          // console.log('yeah')
          if(user.notifications.itemsSold) {
            Object.values(user.notifications.itemsSold).forEach(item => {
              orders.push(item);
            })
          }
        }

        if(index == Object.values(users).length - 1) {
          res.render('index.ejs', {
            title: "NottMyStyle Dashboard", orders
          });
        }

      })
    })

    
  }
};
