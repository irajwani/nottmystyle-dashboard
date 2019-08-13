var admin = require('firebase-admin');

module.exports = {
  getUsers: (req, res) => {
    console.log('fetching users');
    admin.database().ref('/Users/').on('value', async (snap) => {
      const Users = await snap.val();
      const countOfUsers = await Object.keys(Users).length - 1;
      var users = [], userObj, email, name, uri, firebaseAuthData; 
      // console.log(JSON.stringify(Users));
      Object.entries(Users).forEach(async (user, index) => {
        firebaseAuthData = await admin.auth().getUser(user[0]);
        
        // console.log(firebaseAuthData);
        email = firebaseAuthData.email;
        name = user[1].profile.name;
        uri = user[1].profile.uri;

        userObj = {
          userId: user[0],
          email,
          name,
          uri
        };
        // console.log(index, userObj);
        users.push(userObj);
        // console.log(index)
        // console.log('length is' +  countOfUsers)
        if(users.length == countOfUsers) {
          // console.log('retrieved users');
          // console.log(users);
          res.render('users.ejs', {title: "Authenticated Users", users})    
        }

      })
      
      
  })
  }
};
