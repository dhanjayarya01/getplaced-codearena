const request = require('supertest');
const app = require('./server');

describe('Inventory API Tests', () => {
  
  test('GET /api/items/1 should return the Laptop item', async () => {
    const res = await request(app).get('/api/items/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Laptop');
    expect(res.body.quantity).toBe(5);
  });

  test('GET /api/items/999 should return 404', async () => {
    const res = await request(app).get('/api/items/999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /api/items with missing name should return 400', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ quantity: 10 });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid data');
  });

  test('POST /api/items with negative quantity should return 400', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Keyboard', quantity: -5 });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid data');
  });

  test('POST /api/items with valid data should succeed', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Monitor', quantity: 10 });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Monitor');
    expect(res.body.quantity).toBe(10);
  });
});
