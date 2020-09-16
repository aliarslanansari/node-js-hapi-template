import { notFound } from 'utils/responseInterceptors';
import { findOneUser, createUser } from 'daos/usersDao';
import { badRequest } from '@hapi/boom';

module.exports = [
    {
        method: 'GET',
        path: '/{userId}',
        options: {
            description: 'get one user by ID',
            auth: false,
            notes: 'GET users API',
            tags: ['api'],
            cors: true
        },
        handler: async request => {
            const id = request.params.userId;
            return findOneUser({ id }).then(user => {
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
            cors: true
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
                .catch(err => badRequest(err.errors[0].message));
        }
    }
];
