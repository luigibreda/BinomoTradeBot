import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

await mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
console.log('MongoDB connected');

export default User;