import { notFound } from 'utils/responseInterceptors';
import { findOneDriver } from 'daos/driversDao';

module.exports = [
    {
        method: 'GET',
        path: '/{driverId}',
        options: {
            description: 'get one driver by ID',
            auth: false,
            notes: 'GET driver API',
            tags: ['api'],
            cors: true
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
    }
    // {
    //     method: 'POST',
    //     path: '/',
    //     options: {
    //         description: 'Register new driver',
    //         notes: 'POST new driver API',
    //         tags: ['api'],
    //         cors: true
    //     },
    //     handler: request => {
    //         const { name, currentCabId } = request.payload;
    //         return createDriver({ name, currentCabId })
    //             .then(res => res)
    //             .catch(err => err);
    //     }
    // }
];
