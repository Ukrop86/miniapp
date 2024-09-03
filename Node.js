const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require('./path/to/your-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://referals-b30ae-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.use(bodyParser.json());

app.post('/auth', (req, res) => {
  const { id, first_name, last_name, username } = req.body;

  // Save user data to Firebase
  db.ref('users/' + id).set({
    telegramId: id,
    firstName: first_name,
    lastName: last_name,
    username: username
  }).then(() => {
    res.redirect('https://yourdomain.com/success'); // Redirect to your success page
  }).catch((error) => {
    console.error('Error saving user data:', error);
    res.redirect('https://yourdomain.com/error'); // Redirect to your error page
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
