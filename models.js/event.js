// models/event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  category: { type: String, enum: ['Meetings', 'Birthdays', 'Appointments'], required: true },
  reminderSet: { type: Boolean, default: false },
  reminderTime: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Event', EventSchema);
