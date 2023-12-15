// Importing required modules
const request = require('supertest');
const app = require('../src/app'); // Import your Express application

// Test suite for Data Update
describe('Data Update', () => {
  // Test case for successful data update
  it('should update data in a server and the database', async () => {
    // Use supertest to send a POST request to your Express application
    const data = 'Test data';
    await request(app)
      .post('/replicateData')
      .send({ data })
      .expect(200);

    // Update the data
    const updatedData = 'Updated test data';
    await request(app)
      .post('/replicateData')
      .send({ data: updatedData })
      .expect(200);

    // Use supertest to send GET requests to your Express application
    const servers = ['server1', 'server2', 'server3'];
    for (const server of servers) {
      const response = await request(app).get(`/checkData/${server}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(updatedData);
    }

    // Check the updated data in the database
    const dbResponse = await request(app).get('/checkDatabase');
    expect(dbResponse.status).toBe(200);
    expect(dbResponse.body.data).toBe(updatedData);
  });
});
