  // Importing required modules
  const request = require('supertest');
  const app = require('../src/app'); // Import your Express application
  
  // Test suite for Data Persistence
  describe('Data Persistence', () => {
  // Test case for successful data persistence
  it('should persist data in a server after multiple requests', async () => {
      const server = 'server1';
      const data = 'Test data';
  
      // Use supertest to send a POST request to replicate data
      await request(app)
          .post('/replicateData')
          .send({ data })
          .expect(200);
  
        // Use supertest to send multiple GET requests to check data
        for (let i = 0; i < 5; i++) {
          const response = await request(app).get(`/checkData/${server}`);
          expect(response.status).toBe(200);
          expect(response.body.data).toBe(data);
        }
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
  
          // Use supertest to send a POST request with null data
          await request(app)
            .post('/replicateData')
            .send({ data: null })
            .expect(200);
  
          const response = await request(app).get(`/checkData/${server}`);
          expect(response.status).toBe(200);
          expect(response.body.data).toBeNull();
        });
     });
  