// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error(err));

// Schema and model
const formSchema = new mongoose.Schema({
  fullName: String,
  mobileNumber: String,
  photo: String,
});
const Form = mongoose.model('Form', formSchema);

// Routes
app.post('/api/form', async (req, res) => {
  const { fullName, mobileNumber, photo } = req.body;
  const form = new Form({ fullName, mobileNumber, photo });
  await form.save();
  res.json(form);
});

app.get('/api/forms', async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
