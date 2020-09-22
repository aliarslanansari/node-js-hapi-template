import { notFound } from 'utils/responseInterceptors';
import {
    findCab,
    createCab,
    findAllCab,
    deleteCab,
    updateCab
} from 'daos/cabDao';
import MapApi from 'utils/api';
import sortCabs from 'utils/sortCabsByDistance';
import Joi from '@hapi/joi';
import {
    idAllowedSchema,
    numberAllowedSchema,
    stringSchema
} from 'utils/validationUtils';

module.exports = [
    {
        method: 'GET',
        path: '/{cabId}',
        options: {
            description: 'get one cab by ID',
            auth: false,
            notes: 'GET cab API',
            tags: ['api'],
            cors: true,
            validate: {
                params: Joi.object({
                    cabId: idAllowedSchema
                }),
                failAction: (request, h, err) => {
                    throw err;
                }
            }
        },
        handler: async request => {
            const id = request.params.cabId;
            return findCab({ id }).then(cab => {
                if (!cab) {
                    return notFound(`No cab was found for id ${id}`);
                }
                return cab;
            });
        }
    },
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'get all cabs',
            auth: false,
            notes: 'GET all cabs API',
            tags: ['api'],
            cors: true
        },
        handler: async request =>
            findAllCab().then(cabs => {
                if (!cabs) {
                    return notFound(`No cab was found`);
                }
                return cabs;
            })
    },
    {
        method: 'POST',
        path: '/',
        options: {
            description: 'Register new Cab',
            notes: 'POST new Cab',
            tags: ['api'],
            cors: true,
            validate: {
                payload: Joi.object({
                    regNo: stringSchema,
                    brand: stringSchema,
                    model: stringSchema,
                    cabType: stringSchema,
                    baseRate: numberAllowedSchema,
                    latitude: numberAllowedSchema,
                    longitude: numberAllowedSchema
                }),
                failAction: (request, h, err) => {
                    throw err;
                }
            }
        },
        handler: request => {
            const {
                regNo,
                brand,
                model,
                cabType,
                baseRate,
                latitude,
                longitude
            } = request.payload;
            return createCab({
                regNo,
                brand,
                model,
                cabType,
                baseRate,
                latitude,
                longitude
            })
                .then(res => res)
                .catch(err => err);
        }
    },
    {
        method: 'GET',
        path: '/nearby',
        options: {
            description: 'Get nearby cabs',
            notes: 'GET nearby Cabs API',
            tags: ['api'],
            cors: true,
            validate: {
                query: Joi.object({
                    lat: numberAllowedSchema,
                    lon: numberAllowedSchema
                }),
                failAction: (request, h, err) => {
                    throw err;
                }
            }
        },
        handler: async request => {
            const { lat, lon } = request.query;
            let allCabs = await findAllCab().then(cabs => {
                if (!cabs) {
                    return notFound(`No cab was found`);
                }
                return cabs;
            });
            allCabs = await Promise.all(
                allCabs.map(async cab => {
                    const locData = {
                        origins: [{ latitude: lat, longitude: lon }],
                        destinations: [
                            {
                                latitude: cab.latitude,
                                longitude: cab.longitude
                            }
                        ],
                        travelMode: 'driving'
                    };
                    return MapApi.post('/', locData, {
                        params: { key: process.env.BING_KEY }
                    }).then(({ data, ok }) => {
                        if (ok) {
                            const bingRes =
                                data.resourceSets[0].resources[0].results;
                            return {
                                ...cab,
                                travelDuration: bingRes[0].travelDuration,
                                travelDistance: bingRes[0].travelDistance
                            };
                        }
                    });
                })
            );
            return sortCabs(allCabs);
        }
    },
    {
        method: 'DELETE',
        path: '/{cabId}',
        options: {
            description: 'Delete cab by Id',
            notes: 'DELETE cab API',
            tags: ['api'],
            cors: true,
            validate: {
                params: Joi.object({
                    cabId: idAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: async request => {
            const id = request.params.cabId;
            return deleteCab(id)
                .then(res => res)
                .catch(err => err);
        }
    },
    {
        method: 'PATCH',
        path: '/{cabId}',
        options: {
            description: 'Update cab by Id',
            notes: 'PATCH cab API',
            tags: ['api'],
            cors: true,
            validate: {
                params: Joi.object({
                    cabId: idAllowedSchema
                }),
                failAction: (request, h, error) => {
                    throw error;
                }
            }
        },
        handler: async (request, h) => {
            const id = request.params.cabId;
            const {
                regNo,
                brand,
                model,
                cabType,
                baseRate,
                latitude,
                longitude
            } = request.payload;

            return updateCab({
                id,
                regNo,
                brand,
                model,
                cabType,
                baseRate,
                latitude,
                longitude
            })
                .then(res => {
                    if (res) {
                        return 'Updated';
                    }
                })
                .catch(err => err);
        }
    }
];
