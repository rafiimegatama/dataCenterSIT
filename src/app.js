const express = require('express');
const app = express();
app.use(express.json());

// Mock data for our servers
let servers = {
  server1: null,
  server2: null,
  server3: null,
  serverWithNoData: null //
};

// Mock database
let database = null;

// Endpoint to trigger data replication
app.post('/replicateData', (req, res) => {
  const { data } = req.body;

  // Replicate data across all servers
  for (const server in servers) {
    servers[server] = data;
  }

  // Replicate data to the database
  database = data;

  res.status(200).send('Data replicated successfully');
});


// Using hasOwnProperty method to check if the server exist. Return true even if the value of the property is an empty string.
// Updated endpoint to check data integrity on a given server
app.get('/checkData/:server', (req, res) => {
  const { server } = req.params;

  if (!servers.hasOwnProperty(server)) {
    return res.status(404).send('Server not found');
  }

  res.status(200).json({ data: servers[server] });
});

// Endpoint to check data in the database
app.get('/checkDatabase', (req, res) => {
  if (database === null) {
    return res.status(404).send('No data in the database');
  }

  res.status(200).json({ data: database });
});

module.exports = app;
