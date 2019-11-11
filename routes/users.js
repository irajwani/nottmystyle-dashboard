var admin = require('firebase-admin');

module.exports = {
  getUsers: (req, res) => {
    console.log('fetching users');
    // default to sort by appUsage in descending order
    var sortCriteria = req.params.sortCriteria ? req.params.sortCriteria : "accountCreationDesc"
    admin.database().ref('/Users/').on('value', async (snap) => {
      const Users = await snap.val();
      const countOfUsers = await Object.keys(Users).length - 1;
      var users = [], userObj, email, name, uri, insta, appUsage, accountCreation, lastSignIn, firebaseAuthData; 
      // console.log(JSON.stringify(Users));
      Object.entries(Users).forEach(async (user, index) => {
        firebaseAuthData = await admin.auth().getUser(user[0])
        .catch((err)=>{
          console.log(err);
          console.log(user[0]);
        });
        // console.log(firebaseAuthData, user[0]);

        email = firebaseAuthData.email;
        // console.log("User Is:")
        if(user[1].profile === undefined) {
          console.log(user[0])
        }
        name = user[1].profile.name;
        uri = user[1].profile.uri;
        insta = user[1].profile.insta ? user[1].profile.insta : "did not specify";
        appUsage = user[1].appUsage;
        accountCreation = firebaseAuthData.metadata.creationTime;
        lastSignIn = firebaseAuthData.metadata.lastSignInTime;

        userObj = {
          userId: user[0],
          email,
          name,
          uri,
          insta,
          appUsage,
          accountCreation: new Date(accountCreation).getTime(),
          lastSignIn
        };
        // console.log(index, userObj);
        users.push(userObj);
        // console.log(index)
        // console.log('length is' +  countOfUsers)
        if(users.length == countOfUsers) {
          // console.log('retrieved users');
          // console.log(users);
          users.sort((userA, userB) => {
            if(sortCriteria === 'appUsage') {
              return userB.appUsage - userA.appUsage
            }
            else if(sortCriteria === 'accountCreationDesc') {
              return userB.accountCreation - userA.accountCreation 
            }
            else {
              return userA.accountCreation - userB.accountCreation 
            }
          })
          res.render('users.ejs', {title: "Authenticated Users", users })    
        }

      })
      
      
  })
  }
};


// var arr = [{d: "Sat, 25 May 2019 17:12:20 GMT" }, {d: "Thu, 04 Apr 2019 11:36:17 GMT"}, {d: "Fri, 12 Jul 2019 01:54:56 GMT"}];
// //var arr =  [1, 100000, 21, 30, 4]
// arr.sort( (a,b) => {
//   return b.d - a.d
// });
// console.log(arr);
// // expected output: Array [1, 100000, 21, 30, 4]
