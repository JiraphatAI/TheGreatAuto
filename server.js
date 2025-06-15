const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/usedcars', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// ตัวอย่าง Schema
const Car = mongoose.model('Car', new mongoose.Schema({
  updatedAt: { type: Date, default: Date.now },
  license: String,
  brand: String,
  model: String,
  subModel: String,
  year: Number,
  color: String,
  engine: String,
  transmission: String,
  fuel: String,
  price: Number,
  commission: Number,
  status: String,
  imageUrl: String,
  note: String
}));

// API Routes
app.get('/api/cars', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

app.post('/api/cars', async (req, res) => {
  const newCar = new Car(req.body);
  await newCar.save();
  res.json(newCar);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});