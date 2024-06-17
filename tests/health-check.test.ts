import axios from 'axios';
import { Server } from 'http';
import app from '../src/app';

const spawnApp = async (port: number): Promise<Server> => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server starting on ${port}`);
      resolve(server);
    });

    server.on('error', (err) => {
      console.error(`Failed to start server on port 8000: ${err}`);
      reject(err);
    });
  });
};

describe('health check', () => {
  let server: Server;
  let port = 7000;

  beforeAll(async () => {
    server = await spawnApp(port);
  });

  afterAll(() => {
    server.close();
  });

  test('health check works', async () => {
    const response = await axios.get(`http://localhost:${port}/healthCheck`, {
      validateStatus: (status) => status < 500, // Resolve only if the status code is less than 500
    });
    expect(response.status).toBe(200);
  });

  test('subscribe returns 200 for valid form data', async () => {
    const body = 'name=genuine&email=genuine.basilnt%40gmail.com';
    await axios
      .post(`http://localhost:${port}/subscriptions`, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        validateStatus: (status) => status < 500, // Resolve only if the status code is less than 500
      })
      .then((response) => expect(response.status).toBe(200));
  }, 10000);

  test('subscribe returns 400 when data is missing', async () => {
    const testCases = [
      { body: 'name=genuine', errorMessage: 'missing email' },
      { body: 'email=genuine.basilnt@gmail.com', errorMessage: 'missing name' },
      { body: '', errorMessage: 'missing name and email' },
    ];

    for (const { body, errorMessage } of testCases) {
      const response = await axios.post(
        `http://localhost:${port}/subscriptions`,
        body,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          validateStatus: (status) => status < 500, // Resolve only if the status code is less than 500
        },
      );

      try {
        expect(response.status).toBe(400);
      } catch (e) {
        throw new Error(
          `The API did not fail with 400 for payload: ${errorMessage}`,
        );
      }
    }
  });
});
