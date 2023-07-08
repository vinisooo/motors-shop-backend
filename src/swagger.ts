const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const doc = {
  info: {
    title: 'motorsShop',
    description: 'api de compra e venda de carros',
  },
  servers:[
    {
      url:"http://localhost:3001",
      description:"Development server"
    },
    {
      url:"https://motorsshop-w0l3.onrender.com",
      description:"Production server"
    }
  ],
  schemes: ['http']
}

const outputFile = './swagger.json';
const endpointsFiles = ['./app.*{ts,js}'];

swaggerAutogen(outputFile, endpointsFiles, doc);