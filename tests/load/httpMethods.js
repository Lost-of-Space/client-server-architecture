const autocannon = require('autocannon');

const testConfigs = [
  {
    name: 'GET Test - Fetch User Data',
    url: 'https://localhost/api/users',
    method: 'GET',
    connections: 50,
    duration: 15,
  },
  {
    name: 'POST Test - User Registration',
    url: 'https://localhost/api/auth/register',
    method: 'POST',
    payload: {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'TestPassword123!',
    },
    connections: 100,
    duration: 20,
  },
  {
    name: 'PUT Test - Update User Profile',
    url: 'https://localhost/api/users/update',
    method: 'PUT',
    payload: {
      username: 'testuser',
      bio: 'Updated bio information',
    },
    connections: 75,
    duration: 20,
  },
];

function logSummary(name, result) {
  const summary = `
  📊 Load Test Summary for ${name}:
  ======================================================
  📅 Duration: ${result.duration}s
  👥 Connections: ${result.connections}
  🔁 Total Requests Sent: ${result.requests.sent}
  💀 Errors: ${result.errors}
  🚦 Status Codes:
      - 1xx: ${result['1xx'] || 0}
      - 2xx: ${result['2xx'] || 0}
      - 3xx: ${result['3xx'] || 0}
      - 4xx: ${result['4xx'] || 0}
      - 5xx: ${result['5xx'] || 0}
  📈 Requests per Second: ${result.requests.average || 0}
  🕒 Average Latency (ms): ${result.latency.average || 0}
  🔄 Total Throughput (bytes): ${result.throughput.total || 0}
  `;
  console.log(summary);
}

function runTest(config) {
  const testConfig = {
    url: config.url,
    connections: config.connections,
    duration: config.duration,
    method: config.method,
    body: config.payload ? JSON.stringify(config.payload) : null,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(`🚀 Starting load test: ${config.name}`);
  autocannon(testConfig, (err, result) => {
    if (err) {
      console.error(`❌ Error running load test for ${config.name}:`, err);
    } else {
      logSummary(config.name, result);
    }
  });
}

function runLoadTests() {
  console.log('🛠️ Initiating all load tests...');
  for (const config of testConfigs) {
    runTest(config);
  }
}

runLoadTests();
