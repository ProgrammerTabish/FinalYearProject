const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

const http = require('http');
const socketIo = require('socket.io');
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
  }
});








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





const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: [Number], required: true }, // Assuming location is an array of numbers [latitude, longitude]
  complaint: { type: String, required: true },
});

// Create a new model for complaints
const Complaint = mongoose.model('Complaint', complaintSchema);

// Add a new route to handle POST requests for complaints
app.post('/complaints', async (req, res) => {
  const { name, location, complaint } = req.body;

  try {
    // Create a new complaint document
    const newComplaint = new Complaint({ name, location, complaint });
    // Save the complaint to the database
    await newComplaint.save();
    res.status(201).send(newComplaint);
  } catch (error) {
    console.error('Error saving complaint:', error);
    res.status(500).send('Error saving complaint');
  }
});
// Add a new route to get all complains

app.get('/complaints/all', async (req, res) => {
  const { name } = req.params;

  try {
    // Find all complaints with the given name
    const complaints = await Complaint.find();
    res.status(200).send(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).send('Error fetching complaints');
  }
});


// Add a new route to handle GET requests for complaints by name
app.get('/complaints/:name', async (req, res) => {
  const { name } = req.params;

  try {
    // Find all complaints with the given name
    const complaints = await Complaint.find({ name });
    res.status(200).send(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).send('Error fetching complaints');
  }
});
app.delete('/complaints/:id', async (req, res) => {
  const { id } = req.params;

  try {
      // Find the complaint by ID and remove it from the database
      const deletedComplaint = await Complaint.findOneAndDelete({ _id: id });
      if (!deletedComplaint) {
          return res.status(404).send('Complaint not found');
      }
      res.status(200).send('Complaint revoked successfully');
  } catch (error) {
      console.error('Error revoking complaint:', error);
      res.status(500).send('Error revoking complaint');
  }
});




// Websocket Connections








server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});