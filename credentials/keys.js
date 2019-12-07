// const firebaseConfig = {
//     apiKey: "AIzaSyBUkOB1x1F-bsZcGDnxXQI76JbU-4n8vqI",
//     authDomain: "nottmystyle-447aa.firebaseapp.com",
//     databaseURL: "https://nottmystyle-447aa.firebaseio.com",
//     projectId: "nottmystyle-447aa",
//     storageBucket: "nottmystyle-447aa.appspot.com",
//     messagingSenderId: "791527199565"
//   };
const admin = require("firebase-admin")
// var serviceAccount = require('./nottmystyle-447aa-9e63bdff4127.json');
const {TYPE, PROJECT_ID, PRIVATE_KEY_ID, PRIVATE_KEY, CLIENT_EMAIL, CLIENT_ID, AUTH_URI, TOKEN_URI, AUTH_CERT, CLIENT_CERT} = process.env;
var serviceAccount = {
  "type": TYPE,
  "project_id": PROJECT_ID,
  "private_key_id": PRIVATE_KEY_ID,
  "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": CLIENT_EMAIL,
  "client_id": CLIENT_ID,
  "auth_uri": AUTH_URI,
  "token_uri": TOKEN_URI,
  "auth_provider_x509_cert_url": AUTH_CERT,
  "client_x509_cert_url": CLIENT_CERT,
}


const firebaseAdminConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nottmystyle-447aa.firebaseio.com'
}

const CHATKIT_SECRET_KEY = "9b627f79-3aba-48df-af55-838bbb72222d:Pk9vcGeN/h9UQNGVEv609zhjyiPKtmnd0hlBW2T4Hfw="
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:7a5d48bb-1cda-4129-88fc-a7339330f5eb";


//PayPal credentials
const credentials = {
  sandbox: {
    client_id: "Ab0iwKb2EyBI7XmxZtCxtYg_50u5A0y6s1su-RUWPIl6Mo34i9Wdys_RbsKZlv78UepmEhzWGOPGaMl8",
    client_secret: "ENsifoIBBtrYtzKoY5QjgqxrHeQDYEsXeiXJBwZadap3cTZeugkpvmYDUC3L_f5cxQD7GTqiVKhnlZYq"},
  live: {
    client_id: "AeKeWCAwFhnSst0YiAZuSqHupVqUq6TkPjHWR7EIB0dcwrh5CO28XLM7C2Lui1as_BUclFLrIPCwyIIv", 
    client_secret: "ELO7mliZ47nruSGFp7xeP8H3_iQ75D5p96OqTJTTXXLxDNwfElyytumCxTv7hjcBJZGDCfBvs7EAs_F4"
  }
}

module.exports.credentials = credentials;

module.exports.firebaseAdminConfig = firebaseAdminConfig
module.exports.CHATKIT_SECRET_KEY = CHATKIT_SECRET_KEY
module.exports.CHATKIT_INSTANCE_LOCATOR = CHATKIT_INSTANCE_LOCATOR
