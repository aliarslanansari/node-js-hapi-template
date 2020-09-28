import { notFound } from 'utils/responseInterceptors';
import {
    createDriver,
    deleteDriver,
    findOneDriver,
    updateDriver
} from 'daos/driversDao';
import Joi from '@hapi/joi';
import { idAllowedSchema, stringSchema } from 'utils/validationUtils';

module.exports = [
    {
        method: 'GET',
        path: '/{driverId}',
        options: {
            description: 'get one driver by ID',
            notes: 'GET driver API',
            tags: ['api'],
            cors: true,
            validate: {
                params: Joi.object({
                    driverId: idAllowedSchema
                }),
                failAction: (request, h, err) => {
                    throw err;
                }
            }
        },
        handler: async request => {
            const id = request.params.driverId;
            return findOneDriver({ id }).then(driver => {
                if (!driver) {
                    return notFound(`No driver was found for id ${id}`);
                }
                return driver;
            });
        }
    },
    {
        method: 'POST',
        path: '/',
        options: {
            description: 'Register new driver',
            notes: 'POST new driver API',
            tags: ['api'],
            cors: true,
            validate: {
                payload: Joi.object({
                    name: stringSchema,
                    currentCabId: idAllowedSchema
                }),
                failAction: (request, h, err) => {
                    throw err;
                }
            }
        },
        handler: request => {
            const { name, currentCabId } = request.payload;
            return createDriver({ name, currentCabId })
                .then(res => res)
                .catch(err => err);
        }
    },
    {
        method: 'PATCH',
        path: '/{driverId}',
        options: {
            description: 'Update driver by ID',
            notes: 'PATCH driver API',
            tags: ['api'],
            cors: true,
            validate: {
                params: Joi.object({
                    driverId: stringSchema
                }),
                payload: Joi.object({
                    name: stringSchema,
                    currentCabId: idAllowedSchema
                }),
                failAction: (request, h, err) => {
                    throw err;
                }
            }
        },
        handler: async request => {
            const { name, currentCabId } = request.payload;

            const id = request.params.driverId;

            return updateDriver(
                {
                    name,
                    currentCabId
                },
                id
            )
                .then(res => res)
                .catch(err => err);
        }
    },
    {
        method: 'DELETE',
        path: '/{driverId}',
        options: {
            description: 'Delete driver details',
            notes: 'DELETE driver details API',
            tags: ['api'],
            cors: true,
            validate: {
                params: Joi.object({
                    driverId: idAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: async request => {
            const id = request.params.driverId;
            return deleteDriver(id)
                .then(res => res)
                .catch(err => err);
        }
    }
];
