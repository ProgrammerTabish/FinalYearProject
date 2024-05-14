const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    userType: { type: String }
});

const User = mongoose.model('User', UserSchema);



// Middleware function to verify JWT
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send('Access denied. Token is missing.');
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    
      next();
    } catch (err) {
      return res.status(401).send('Invalid token.');
    }
  }
  
// Protected Rout
  app.get('/protected', verifyToken, (req, res) => {
    res.send('This is a protected route.');
  });
  





// Sign-up endpoint
app.post('/signup', async (req, res) => {
    try {
        
        const { email, password, userType } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).send('Invalid email format!');
        }
        
        // Validate password length
        if (password.length < 6) {
          return res.status(400).send('Password must be at least 6 characters long!');
        }
        
        const check = await User.findOne({ email });
        if (!check) {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({ email, password: hashedPassword, userType });
          await user.save();
          return res.status(201).send('User created');
        } else {
          return res.status(409).send('User already exists, can not create an account!');
        }
        
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// Sign-in endpoint
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }
        const token = jwt.sign({ email: user.email, userType: user.userType }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.put('/profile', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        res.status(200).send('Password updated');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
