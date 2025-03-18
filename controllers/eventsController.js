// In-memory events storage (keyed by user id)
let eventsData = {};

// Counter to generate unique event IDs
let eventIdCounter = 1;

exports.createEvent = (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { name, description, date, time, category, reminder } = req.body;
  const newEvent = {
    id: eventIdCounter++,
    name,
    description,
    date,
    time,
    category,
    reminder: reminder || false
  };

  if (!eventsData[userId]) {
    eventsData[userId] = [];
  }
  eventsData[userId].push(newEvent);
  res.status(201).json({ message: 'Event created', event: newEvent });
};

exports.getEvents = (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  let userEvents = eventsData[userId] || [];

  // Optional sorting by query parameter: date, category, or reminder
  const { sortBy } = req.query;
  if (sortBy === 'date') {
    userEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === 'category') {
    userEvents.sort((a, b) => a.category.localeCompare(b.category));
  } else if (sortBy === 'reminder') {
    // Sorting: events with reminders (true) come first
    userEvents.sort((a, b) => (b.reminder === true) - (a.reminder === true));
  }

  res.json({ events: userEvents });
};
