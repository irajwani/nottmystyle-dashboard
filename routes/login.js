const passport = require('passport');

module.exports = {
    showLoginPage: (req,res,next)=>{
        res.render('login');
    },
    handleLogin: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/orders',
            failureRedirect: '/login',
            // failureFlash: true
        })(req, res, next);
    }
}