const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const crypto = require('crypto');
const app = express();

// Initialize Firebase Admin SDK
const serviceAccount = require('./referals-b30ae-firebase-adminsdk-6bcfh-fe6480e5de.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://referals-b30ae-default-rtdb.firebaseio.com'
});

const db = admin.database();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/auth', async (req, res) => {
  const data = req.body; // Telegram sends data in POST body
  const hash = req.query.hash;
  
  // Check if the signature is valid
  const secret = '7475830625:AAGuEX6UxNLwHe-yIgtyq1mtkKdKM25lzJs'; // Replace with your bot's token
  const generatedHash = crypto.createHmac('sha256', secret).update(new URLSearchParams(data).toString()).digest('hex');
  
  if (generatedHash !== hash) {
    return res.status(400).send('Invalid signature');
  }

  const userId = data.id;
  const user = {
    id: userId,
    firstName: data.first_name,
    lastName: data.last_name,
    username: data.username,
    photoUrl: data.photo_url
  };

  try {
    await db.ref('users/' + userId).set(user);
    res.send('User data saved');
  } catch (error) {
    console.error('Error saving user data: ', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
