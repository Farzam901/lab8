const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Configure session middleware
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// Route middleware
app.use('/auth', authRoutes);
app.use('/events', eventsRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Event Planner API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for testing
module.exports = app;
