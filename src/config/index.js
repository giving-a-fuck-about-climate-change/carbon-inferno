const environment = {
  test: {
    apiEndpoint: 'http://127.0.0.1:8000',
  },
  development: {
    apiEndpoint: 'http://carbondoomsday-test.herokuapp.com',
  },
  staging: {
    apiEndpoint: 'http://carbondoomsday-test.herokuapp.com',
  },
  production: {
    apiEndpoint: 'http://carbondoomsday-test.herokuapp.com',
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  node_env: process.env.NODE_ENV || 'development',
}, environment);
