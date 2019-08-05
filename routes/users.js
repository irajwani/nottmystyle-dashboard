var admin = require('firebase-admin');

module.exports = {
  getUsers: (req, res) => {
    console.log('fetching users');
    admin.database().ref('/Users/').on('value', async (snap) => {
      const Users = snap.val();
      let users = [], userObj;
      Object.entries(Users).forEach(async (user, index) => {
        let firebaseAuthData = await admin.auth().getUser(user[0]);
        let email = firebaseAuthData.email;
        users.push({
          userId: user[0],
          email,
          name: user[1].name,
          uri: user[1].uri
        })

        if(index == Users.length - 1) {
          res.render('users.ejs', {title: "Authenticated Users", users})    
        }

      })
      
      
  })
  }
};
