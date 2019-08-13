var admin = require('firebase-admin');

module.exports = {
    getProductsForUser: (req, res) => {
        var usersProducts = [];
        admin.database().ref('/Products/').on('value', async (snap) => {
            const Products = Object.values(snap.val());
            // console.log(Products);
            let {userId} = req.params;
            let promiseToGetProducts = new Promise((resolve, reject) => {
                usersProducts = Products.filter(element => {
                    return element.uid == userId
                });
                resolve(usersProducts);
            })
            
            // let productData = Products[productId]
            console.log(usersProducts.length);
            promiseToGetProducts.then((usersProducts) => {
                res.render('products.ejs', {title: "Product Data for ", products: usersProducts})    
            }).catch((err) => {
                console.log('failed to get products')
            });
            
        })
    }
}