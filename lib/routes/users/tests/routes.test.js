/* global server */
import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';
import { resolveConfig } from 'prettier';
import { isEqual } from 'lodash';

const { MOCK_USER: user } = mockData;

const payload = {
    name: user.name,
    email: user.email,
    phoneNo: user.phoneNo,
    country: user.country,
    gender: user.gender,
    dob: user.dob
};

describe('/users route tests ', () => {
    beforeAll(() => {
        jest.doMock('root/server', () => ({
            server: {
                ...server,
                methods: {
                    findOneUser: id => {
                        if (isEqual(id, 1)) {
                            return new Promise(resolve => resolve(user));
                        } else {
                            return new Promise(resolve => resolve(null));
                        }
                    }
                }
            }
        }));
    });
    it('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/users/1'
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should return 404', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/users/2'
        });
        expect(res.statusCode).toEqual(404);
        expect(res.result.message).toEqual('No user was found for id 2');
    });

    it('should create a user with the provided details', async () => {
        let server;
        server = await resetAndMockDB(async allDbs => {
            allDbs.users.create = () =>
                new Promise((resolve, reject) => resolve(user));
        });
        const res = await server.inject({
            method: 'POST',
            url: '/users',
            payload
        });
        expect(res.statusCode).toEqual(200);
        const { result } = res;
        expect(result.id).toEqual(1);
        expect(result.name).toEqual(payload.name);
        expect(result.gender).toEqual(payload.gender);
        expect(result.phone_no).toEqual(payload.phoneNo);
        expect(result.country).toEqual(payload.country);
        expect(result.dob).toEqual(payload.dob);
    });
});
