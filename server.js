const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Connected to database successfully"))
.catch(err => console.error(" MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("data", userSchema);

app.get('/', (req, res) => res.send("API Running"));

app.post('/post', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();

    console.log(newUser);
    res.status(201).send(" Sign up successful");
  } catch (err) {
    console.error(" Error saving user:", err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(` Server started on http://localhost:${PORT}`));
