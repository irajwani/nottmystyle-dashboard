// var express = require('express');
// var router = express.Router();
var admin = require('firebase-admin');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   //get orders data and pass it here
//   res.render('index', { title: 'NottMyStyle Dashboard' });
// });

// function getOrdersFrom(users, products) {
  
// }

function countOrdersFrom(users) {
  let count = 0;
  Object.values(users).forEach( user => {
    if(user.notifications) {
      if(user.notifications.itemsSold) {
        Object.values(user.notifications.itemsSold).forEach( order => {
          // console.log('Increment Count');
          count++
        })
      }
    }
  })


  return count;
}

module.exports = {
  getOrders: (req, res) => {
    // console.log('Begin Order Retrieval')
    admin.database().ref().once('value', async (snapshot) => {
      let d = snapshot.val();
      let users = d.Users, products = d.Products;
      // const orders = await getOrdersFrom(users, products);
      // res.render('index.js', {orders})
      
      Object.values(users).forEach(async (user, index) => {
        var orders = [], obj, 
        buyerRecord, sellerRecord;
        var productName, productPrice, productPostPrice;
        // console.log('Retrieved Users:');
        let countOfOrders = await countOrdersFrom(users)
    
        if(user.notifications) {
          // console.log('yeah')
          if(user.notifications.itemsSold) {
            var productKeys = Object.keys(user.notifications.itemsSold);
            // console.log(productKeys);
            Object.values(user.notifications.itemsSold).forEach(async (item, index) => {
              let currentProductId = await productKeys[index];
              // console.log(currentProductId, index)
              console.log(products[currentProductId]);
              if(products[currentProductId] !== undefined) {
                // console.log('The Product Exists', index)
                var {price, post_price, name} = await products[currentProductId].text
                productPrice = await price
                productPostPrice = await post_price
                productName = await name
              }
              else {
                // console.log('Product does not exist', index)
                productPrice = await '-';
                productPostPrice = await '-';
                productName = await 'Does not exist in database';
              }
              console.log(productPrice, productPostPrice, productName);
              // admin.auth().getUser(item.buyerId).then(userRecord => console.log(userRecord))
              buyerRecord = await admin.auth().getUser(item.buyerId)
              sellerRecord = await admin.auth().getUser(item.sellerId)
              
              // product =  users[item.sellerId].products[productKeys[index]]
              
              var buyerEmail = await buyerRecord.email, sellerEmail = await sellerRecord.email; 
              
              obj = await {
                buyerName: item.buyerName,
                buyerEmail,
                sellerName: item.sellerName,
                sellerEmail,
                uri: item.uri,
                deliveryStatus: item.deliveryStatus,
                productId: currentProductId,
                productName, 
                productPrice,
                productPostPrice,
              }
              // console.log(obj, index);
              await orders.push(obj);
              // console.log(orders)
    
              if(orders.length == countOfOrders) {
                res.render('index.ejs', {
                  title: "NottMyStyle Dashboard", orders
                });
              }
    
              
              
            })
          }

          else {
            if(index == Object.values(users).length - 1) {
              res.render('index.ejs', {
                title: "NottMyStyle Dashboard", orders
              });
            }
          }
          
    
        }

        else {
          if(index == Object.values(users).length - 1) {
            res.render('index.ejs', {
              title: "NottMyStyle Dashboard", orders
            });
          }
        }
    
        
    
        
    
      })
    })

    
  }
};
