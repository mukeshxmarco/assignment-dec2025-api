import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  cardNumber: {
    type: String,
    required: [true, 'Card number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{13,19}$/.test(v.replace(/\s/g, '')); // Basic card number validation (13-19 digits)
      },
      message: 'Invalid card number format'
    }
  },
  expiryMonth: {
    type: String,
    required: [true, 'Expiry month is required'],
    validate: {
      validator: function(v) {
        const month = parseInt(v);
        return month >= 1 && month <= 12;
      },
      message: 'Month must be between 01 and 12'
    }
  },
  expiryYear: {
    type: String,
    required: [true, 'Expiry year is required'],
    validate: {
      validator: function(v) {
        const year = parseInt(v);
        const currentYear = new Date().getFullYear();
        return year >= currentYear && year <= currentYear + 20;
      },
      message: 'Invalid expiry year'
    }
  }
}, {
  timestamps: true
});

// Indexes for optimized queries
cardSchema.index({ userId: 1 }); // Lookup cards by user

export default mongoose.model('Card', cardSchema);
