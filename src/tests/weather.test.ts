import app from '../app';
import request from 'supertest';

describe('GET -> /location', () => {
  test('Status code should be 200', async () => {
    const response = await request(app).get('/v1/location');

    expect(response.statusCode).toBe(200);
  });

  test('Response should be json', async () => {
    const response = await request(app).get('/v1/location');

    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('Response should match type of CityLocation', async () => {
    const response = await request(app).get('/v1/location');

    expect(response.body).toHaveProperty('lat');
    expect(response.body).toHaveProperty('lon');
    expect(response.body).toHaveProperty('country');
  });
});

describe('GET -> /current', () => {
  test('Status code should be 200', async () => {
    const response = await request(app).get('/v1/current');

    expect(response.statusCode).toBe(200);
  });

  test('Response should be json', async () => {
    const response = await request(app).get('/v1/current');
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('Response should be falsy given invalid location', async () => {
    const response = await app.get('/v1/current/invalidlocationame');
    expect(response).toBeFalsy();
  });
});

describe('GET -> /forecast', () => {
    test('Status code should be 200', async () => {
      const response = await request(app).get('/v1/forecast');
  
      expect(response.statusCode).toBe(200);
    });
  
    test('Response should be json', async () => {
      const response = await request(app).get('/v1/forecast');
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });
  
    test('Response should be falsy given invalid location', async () => {
      const response = await app.get('/v1/forecast/invalidlocationame');
      expect(response).toBeFalsy();
    });
  });
