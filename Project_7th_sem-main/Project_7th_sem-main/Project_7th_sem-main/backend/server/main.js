const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projectdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  title: { type: String, required: true }, // Add title field to user schema
});

// Create a user model
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { phone, password, repeatPassword, title } = req.body;

    // Check if passwords match
    if (password !== repeatPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ phone, password: hashedPassword, title });

    // Save the user to the database
    await newUser.save();

   res.json({ message: 'Register successful', title: title, phone:phone });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { title, phone, password } = req.body;

    // Find the user by title and phone number
    const user = await User.findOne({ title, phone });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.json({ message: 'Login successful', title: user.title, phone:user.phone });
    } else {
      res.status(401).json({ error: 'Invalid phone number or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Password change endpoint
app.post('/change-password', async (req, res) => {
  try {
    const { title, phone, newPassword } = req.body;

    // Find the user by title and phone number
    const user = await User.findOne({ title, phone });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
