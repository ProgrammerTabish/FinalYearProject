const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

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

// Sign-up endpoint
app.post('/signup', async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, userType });
        await user.save();
        res.status(201).send('User created');
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
