import { findOneUser } from 'daos/usersDao';
import { redisCacheType } from 'utils/cacheConstants';

export const cachedUser = async server => {
    await server.method('findOneUser', findOneUser, {
        generateKey: id => `${id}`,
        cache: redisCacheType
    });
};
