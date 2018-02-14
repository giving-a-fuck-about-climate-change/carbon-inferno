const environment = {
  test: {
    apiEndpoint: 'http://127.0.0.1:8000',
  },
  development: {
    apiEndpoint: 'https://api-test.carbondoomsday.com',
  },
  staging: {
    apiEndpoint: 'https://api-test.carbondoomsday.com',
  },
  production: {
    apiEndpoint: 'https://api.carbondoomsday.com',
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    node_env: process.env.NODE_ENV || 'development',
  },
  environment,
);
