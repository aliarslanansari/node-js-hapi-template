import { findOneUser } from 'daos/usersDao';
import { findOneDriver } from 'daos/driversDao';
import { redisCacheType } from 'utils/cacheConstants';

export const cachedUser = async server => {
    await server.method('findOneUser', findOneUser, {
        generateKey: id => `${id}`,
        cache: redisCacheType
    });
};

export const cachedDriver = async server => {
    await server.method('findOneDriver', findOneDriver, {
        generateKey: id => `${id}`,
        cache: redisCacheType
    });
};
