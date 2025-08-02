import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    // unique: true ❌ Removed to allow overwrite or duplicates
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);

export default User;
