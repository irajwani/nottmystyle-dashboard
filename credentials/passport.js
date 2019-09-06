const LocalStrategy = require('passport-local').Strategy;
var admin = require('firebase-admin');

module.exports = function(passport) {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // Match user
        admin.database().ref('/DashboardUsers/').once('value', (snapshot) => {
            console.log('cross-referencing input against DB');
            var users = snapshot.val();
            users = Object.values(users);
            let user = users.find((u) => {
                return u.username == email;
            })
            if(!user) {
                return done(null, false, { message: 'That email is not registered' });
            }
            else {
                return done(null, user);
            }

        })
        // User.findOne({
        //   email: email
        // }).then(user => {
        //   if (!user) {
        //     return done(null, false, { message: 'That email is not registered' });
        //   }
  
        //   // Match password
        //   bcrypt.compare(password, user.password, (err, isMatch) => {
        //     if (err) throw err;
        //     if (isMatch) {
        //       return done(null, user);
        //     } else {
        //       return done(null, false, { message: 'Password incorrect' });
        //     }
        //   });
        // });
      })
    );
  
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
  
    passport.deserializeUser(function(id, done) {
      admin.database().ref('/DashboardUsers/').once('value', (snapshot) => {
        var users = snapshot.val();
        users = Object.values(users);
        let user = users.find((u) => {
            return u.id == id;
        })
        done(err, user);
      })
    //   User.findById(id, function(err, user) {
    //     done(err, user);
    //   });
    });
  };