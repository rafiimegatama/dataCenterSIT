// Importing required modules
const request = require('supertest');
const app = require('../src/app'); // Import your Express application

// Test suite for Data Retrieval
describe('Data Retrieval', () => {
  // Test case for successful data retrieval
  it('should retrieve data from a server', async () => {
    // Use supertest to send a GET request to your Express application
    const server = 'server1';
    const response = await request(app).get(`/checkData/${server}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  // Test case for non-existent server
  it('should return 404 for a server that does not exist', async () => {
    const server = 'nonexistentServer';
    const response = await request(app).get(`/checkData/${server}`);

    // Assertions
    expect(response.status).toBe(404);
  });

  // Test case for server with no data
  it('should return 200 and null data for a server with no data', async () => {
    const server = 'serverWithNoData';
    const response = await request(app).get(`/checkData/${server}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.data).toBeNull();
  });
});
