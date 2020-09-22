/* global server */
import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

const { MOCK_USER: user } = mockData;

describe('/users route tests ', () => {
    let server;
    beforeEach(async () => {
        server = await resetAndMockDB(async allDbs => {
            allDbs.users.$queryInterface.$useHandler(function(query) {
                if (query === 'findById') {
                    return user;
                }
            });
        });
    });
    it.only('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/users/1'
        });
        console.log(res.result.message);
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
});
