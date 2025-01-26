const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connect("mongodb+srv://luciferispro69:Lucifer%4069@cluster0.jdzvl.mongodb.net/portfolioTracker", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
