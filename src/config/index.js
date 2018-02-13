const environment = {
  test: {
    apiEndpoint: 'http://127.0.0.1:8000',
  },
  development: {
    // NOTE: carbondoomsday-test is dead. Ask @lwm to make api-test.carbondoomsday.com soon!
    apiEndpoint: 'https://carbondoomsday-test.herokuapp.com',
  },
  staging: {
    // NOTE: carbondoomsday-test is dead. Ask @lwm to make api-test.carbondoomsday.com soon!
    apiEndpoint: 'https://carbondoomsday-test.herokuapp.com',
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
