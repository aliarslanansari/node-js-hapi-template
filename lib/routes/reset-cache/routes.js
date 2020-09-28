import { server } from 'root/server.js';
import { badRequest } from '@hapi/boom';

module.exports = [
    {
        method: 'DELETE',
        path: '/users/{userId}',
        handler: request => {
            const userId = request.params.userId;
            return server.methods.findOneUser.cache
                .drop(userId)
                .then(() => 'Cache Dropped Successfully')
                .catch(error =>
                    // request.log('error', error);
                    badRequest(error.message)
                );
        },
        options: {
            description: 'resetting cache for users',
            notes: 'DELETE user cache API',
            tags: ['api']
        }
    },
    {
        method: 'DELETE',
        path: '/drivers/{driverId}',
        handler: request => {
            const driverId = request.params.driverId;
            return server.methods.findOneDriver.cache
                .drop(driverId)
                .then(() => 'Cache Dropped Successfully')
                .catch(error =>
                    // request.log('error', error);
                    badRequest(error.message)
                );
        },
        options: {
            description: 'resetting cache for users',
            notes: 'DELETE user cache API',
            tags: ['api']
        }
    }
];
