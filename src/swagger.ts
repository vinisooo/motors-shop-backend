const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'motorsShop',
    description: 'api de compra e venda de carros',
  },
  host: 'localhost:3001',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);