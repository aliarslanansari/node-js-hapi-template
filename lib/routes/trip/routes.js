import { badRequest, notFound } from 'utils/responseInterceptors';
import {
    createTripStart,
    findOneTrip,
    findUsersTrips,
    updateTripEnd
} from 'daos/tripDao';
import Joi from '@hapi/joi';
import { dateAllowedSchema, idAllowedSchema } from 'utils/validationUtils';

module.exports = [
    {
        method: 'GET',
        path: '/{tripId}',
        options: {
            description: 'get one trip details by ID',
            notes: 'GET trip API',
            tags: ['api'],
            cors: true,
            validate: {
                params: Joi.object({
                    tripId: idAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: async request => {
            const id = request.params.tripId;
            return findOneTrip(id).then(trip => {
                if (!trip) {
                    return notFound(`No trip was found for id ${id}`);
                }
                return trip;
            });
        }
    },
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'Get trip by userID',
            notes: 'GET trip by userId API',
            tags: ['api'],
            cors: true,
            validate: {
                query: Joi.object({
                    user_id: idAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: request => {
            const id = request.query.userId;
            return findUsersTrips(id).then(trips => {
                if (!trips) {
                    return notFound(`No trip was found for user id ${id}`);
                }
                return trips;
            });
        }
    },
    {
        method: 'POST',
        path: '/start',
        options: {
            description: 'Start users Trip',
            notes: 'POST trip',
            tags: ['api'],
            cors: true,
            validate: {
                payload: Joi.object({
                    riderId: idAllowedSchema,
                    driverId: idAllowedSchema,
                    cabId: idAllowedSchema,
                    startLocId: idAllowedSchema,
                    endLocId: idAllowedSchema,
                    tripStartTime: dateAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: async request => {
            const {
                riderId,
                driverId,
                cabId,
                startLocId,
                endLocId,
                tripStartTime
            } = request.payload;
            const resT = await createTripStart({
                riderId,
                driverId,
                cabId,
                startLocId,
                endLocId,
                tripStartTime
            })
                .then(res => res)
                .catch(err => badRequest(err.message));
            return resT;
        }
    },
    {
        method: 'PATCH',
        path: '/{tripId}',
        options: {
            description: 'End users Trip',
            notes: 'PATCH end trip',
            tags: ['api'],
            cors: true,
            validate: {
                payload: Joi.object({
                    tripEndTime: dateAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: async request => {
            const { tripEndTime } = request.payload;
            const id = request.params.tripId;
            const resT = await updateTripEnd({ id, tripEndTime })
                .then(res => res)
                .catch(err => badRequest(err.message));
            return resT;
        }
    }
];
