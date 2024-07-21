import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'API for managing authors and books',
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
                },
            }
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
        servers: [
            {
                url: 'http://localhost:3000', 
            },
        ],
    },
    // apis: ['src/**/*.ts'],
    apis: ['./src/**/*.ts', './src/**/controllers/*.ts', './src/models/*.ts'], 

};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};