import { SCOPE_TYPE } from 'utils/constants';
import { hasScopeOverUser, hasScopeOverDriver } from 'utils/index';

export const paths = [
    {
        path: '/me',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/resources',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN],
        method: 'POST'
    },
    {
        path: '/oauth2/resources/{resourceId}',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN],
        method: 'PATCH'
    },
    {
        path: '/oauth2/resources/{resourceId}',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/resources',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/scopes',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN],
        method: 'POST'
    },
    {
        path: '/oauth2/scopes/{scopeId}',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/scopes',
        scopes: [SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/oauth2/clients',
        scopes: [SCOPE_TYPE.INTERNAL_SERVICE, SCOPE_TYPE.SUPER_ADMIN],
        method: 'POST'
    },
    {
        path: '/oauth2/clients',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN,
            SCOPE_TYPE.USER
        ],
        method: 'GET'
    },
    {
        path: '/users',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN
        ],
        method: 'GET'
    },
    // ADDED FOR CAB SERVICE
    {
        path: '/users/{userId}',
        scopes: [
            SCOPE_TYPE.INTERNAL_SERVICE,
            SCOPE_TYPE.SUPER_ADMIN,
            SCOPE_TYPE.ADMIN,
            SCOPE_TYPE.USER
        ],
        method: 'GET',
        customValidator: async payload => await hasScopeOverUser(payload)
    },
    {
        path: '/cabs/{cabId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/cabs',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/cabs',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'POST'
    },
    {
        path: '/cabs/nearby',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/cabs/{cabId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'DELETE'
    },
    {
        path: '/cabs/{cabId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'PATCH'
    },
    {
        path: '/drivers/{driverId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'GET',
        customValidator: async payload => await hasScopeOverDriver(payload)
    },
    {
        path: '/drivers',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'POST'
    },
    {
        path: '/drivers/{driverId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'PATCH'
    },
    {
        path: '/drivers/{driverId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'DELETE'
    },
    {
        path: '/trip/{tripId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/trip/user/{userId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/trip/start',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/trip/end',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'GET'
    },
    {
        path: '/users',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'POST'
    },
    {
        path: '/users/{userId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'PATCH'
    },
    {
        path: '/users/{userId}',
        scopes: [SCOPE_TYPE.ADMIN, SCOPE_TYPE.SUPER_ADMIN, SCOPE_TYPE.USER],
        method: 'DELETE'
    }
];
