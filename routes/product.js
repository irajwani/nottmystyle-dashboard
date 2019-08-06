var admin = require('firebase-admin');

module.exports = {
    getProduct: (req, res) => {
        admin.database().ref().on('value', async (snap) => {
            const d = snap.val();
            const {Products, Users} = d;
            let {productId} = req.params;
            let productData = Products[productId]
            res.render('product.ejs', {title: "Product Data", product: productData})
        })
    }
}