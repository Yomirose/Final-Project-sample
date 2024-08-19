require('dotenv').config();
const express = require("express");
const mongoose  = require("mongoose");
const app = express();
const PORT= 5000;
const User = require('./models/user.js')
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const url = "mongodb+srv://yomirose57:Johntosin24@cluster0.mlljw4j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const conectionParams={
    useNewUrlParser: true,
    useUniFiedTopology: true
}
mongoose.connect(url, conectionParams)
    .then( () => {
        console.log("Connected to database")
    })
    .catch( (err) => {
        console.log(`Err connecting to database n${err}`)
    });

app.use(express.json())

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ username, password, email });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// login
app.post('/register/login', async (req, res) => {
  const { username} = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Wrong credential!' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User loggedin successfully", username, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Wrong credential!' });
  }
});



app.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`)
});