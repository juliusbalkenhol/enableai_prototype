import request from 'supertest';
import app from '../app';

describe('Dataset API', () => {
  it('GET /api/datasets should return an array', async () => {
    const res = await request(app).get('/api/datasets');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
