import { notFound, badRequest } from 'utils/responseInterceptors';
import { createUser, deleteUser, updateUser } from 'daos/usersDao';

import { server } from 'root/server.js';
import {
    dateAllowedSchema,
    emailAllowedSchema,
    idAllowedSchema,
    phoneNumber,
    stringSchema
} from 'utils/validationUtils';
import Joi from '@hapi/joi';
module.exports = [
    {
        method: 'GET',
        path: '/{userId}',
        options: {
            description: 'get one user by ID',
            notes: 'GET users API',
            tags: ['api'],
            cors: true,
            validate: {
                params: Joi.object({
                    userId: idAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: async request => {
            const id = request.params.userId;
            return server.methods.findOneUser(id).then(user => {
                if (!user) {
                    return notFound(`No user was found for id ${id}`);
                }
                return user;
            });
        }
    },
    {
        method: 'POST',
        path: '/',
        options: {
            description: 'Register new user',
            notes: 'POST new user API',
            tags: ['api'],
            cors: true,
            validate: {
                payload: Joi.object({
                    name: stringSchema,
                    email: emailAllowedSchema,
                    phoneNo: phoneNumber,
                    country: stringSchema,
                    gender: stringSchema,
                    dob: dateAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: request => {
            const {
                name,
                email,
                phoneNo,
                country,
                gender,
                dob
            } = request.payload;
            return createUser({
                name,
                email,
                phoneNo,
                country,
                gender,
                dob
            })
                .then(res => res)
                .catch(err => badRequest(err.errors[0]));
        }
    },
    {
        method: 'PATCH',
        path: '/{userId}',
        options: {
            description: 'Update user details',
            notes: 'PATCH user details API',
            tags: ['api'],
            cors: true,
            validate: {
                payload: Joi.object({
                    name: stringSchema,
                    email: emailAllowedSchema,
                    phoneNo: phoneNumber,
                    country: stringSchema,
                    gender: stringSchema,
                    dob: dateAllowedSchema
                }),
                params: Joi.object({
                    userId: idAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: async request => {
            const {
                name,
                email,
                phoneNo,
                country,
                gender,
                dob
            } = request.payload;

            const id = request.params.userId;

            return updateUser(
                {
                    name,
                    email,
                    phoneNo,
                    country,
                    gender,
                    dob
                },
                id
            )
                .then(res => res)
                .catch(err => err);
        }
    },
    {
        method: 'DELETE',
        path: '/{userId}',
        options: {
            description: 'Delete user details',
            notes: 'DELETE user details API',
            tags: ['api'],
            cors: true,
            validate: {
                params: Joi.object({
                    userId: idAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: async request => {
            const id = request.params.userId;
            return deleteUser(id)
                .then(res => res)
                .catch(err => err);
        }
    }
];
