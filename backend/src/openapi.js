const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Matrika API',
      version: '0.1.0',
    },
  },
  apis: ['./routes/*.yaml', './openapi.yaml'], 
};


function init(app) {
  const openapiSpecification = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}

module.exports = { init }; 