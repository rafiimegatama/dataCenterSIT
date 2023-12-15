// Importing required modules
const request = require('supertest');
const app = require('../src/app'); // Import your Express application

// Test suite for Server Status
describe('Server Status', () => {
  // Test case for successful server status check
  it('should return 200 for a running server', async () => {
    const server = 'server1';
    const response = await request(app).get(`/checkData/${server}`);
    expect(response.status).toBe(200);
  });

  // Test case for non-existent server
  it('should return 404 for a server that does not exist', async () => {
    const server = 'nonexistentServer';
    const response = await request(app).get(`/checkData/${server}`);
    expect(response.status).toBe(404);
  });

  // Test case for server with no data
  it('should return 200 and null data for a server with no data', async () => {
    const server = 'serverWithNoData';
    const response = await request(app).get(`/checkData/${server}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeNull();
  });
});
