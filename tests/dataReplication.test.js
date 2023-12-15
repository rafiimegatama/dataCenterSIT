// Importing required modules
const request = require('supertest');
const app = require('../src/app'); // Import your Express application

// Test suite for Data Replication
describe('Data Replication', () => {
  // Test case for successful data replication
  it('should replicate data across all servers and the database', async () => {
    // Use supertest to send a POST request to your Express application
    const data = 'Test data';
    await request(app)
      .post('/replicateData')
      .send({ data })
      .expect(200);

    // Use supertest to send GET requests to your Express application
    const servers = ['server1', 'server2', 'server3'];
    for (const server of servers) {
      const response = await request(app).get(`/checkData/${server}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(data);
    }

    // Check the data in the database
    const dbResponse = await request(app).get('/checkDatabase');
    expect(dbResponse.status).toBe(200);
    expect(dbResponse.body.data).toBe(data);
  });

  // Test case for failed data replication
  it('should return 404 for a server that does not exist', async () => {
    const response = await request(app)
      .get('/checkData/nonexistentServer')
      .expect(404);
  });

// New test case for empty data
  it('should handle empty data', async () => {
    // Use supertest to send a POST request with empty data
    await request(app)
      .post('/replicateData')
      .send({ data: '' })
      .expect(200);

    // Use supertest to send GET requests to your Express application
    const servers = ['server1', 'server2', 'server3'];
    for (const server of servers) {
      const response = await request(app).get(`/checkData/${server}`);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe('');
    }

    // Check the data in the database
    const dbResponse = await request(app).get('/checkDatabase');
    expect(dbResponse.status).toBe(200);
    expect(dbResponse.body.data).toBe('');
  });
});



// need to install supertest
// need to install express