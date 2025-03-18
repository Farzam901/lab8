const request = require('supertest');
const app = require('../app');

describe('Event Planner API', () => {
  let agent = request.agent(app);

  it('should login successfully with valid credentials', async () => {
    const res = await agent
      .post('/auth/login')
      .send({ username: 'user1', password: 'password1' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Login successful');
  });

  it('should create an event for the logged-in user', async () => {
    const eventData = {
      name: "Team Meeting",
      description: "Discuss project updates",
      date: "2025-03-25",
      time: "10:00",
      category: "Meetings",
      reminder: true
    };

    const res = await agent
      .post('/events')
      .send(eventData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.event).toHaveProperty('id');
    expect(res.body.event.name).toEqual(eventData.name);
  });

  it('should fetch events sorted by date', async () => {
    const res = await agent
      .get('/events?sortBy=date');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.events)).toBe(true);
  });

  it('should logout successfully', async () => {
    const res = await agent.get('/auth/logout');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Logged out successfully');
  });
});
