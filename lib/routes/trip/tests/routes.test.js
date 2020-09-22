import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

const { MOCK_TRIP: trip } = mockData;

const payload = {
    riderId: trip.riderId,
    driverId: trip.driverId,
    cabId: trip.cabId,
    startLocId: trip.startLocId,
    endLocId: trip.endLocId,
    tripStartTime: trip.tripStartTime
};

describe('/trips route tests ', () => {
    it('should return 200', async () => {
        const server = await resetAndMockDB(async allDbs => {
            allDbs.trip.$queryInterface.$useHandler(function(query) {
                if (query === 'findOne') {
                    return trip;
                }
            });
        });
        const res = await server.inject({
            method: 'GET',
            url: '/trip/1'
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should return 404', async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
        const server = await resetAndMockDB(async allDbs => {
            allDbs.trip.$queryInterface.$useHandler(function(query) {
                if (query === 'findOne') {
                    return null;
                }
            });
        });

        const res = await server.inject({
            method: 'GET',
            url: '/trip/2'
        });
        expect(res.statusCode).toEqual(404);
        expect(res.result.message).toEqual('No trip was found for id 2');
    });

    it('should create a trip with the provided details', async () => {
        const server = await resetAndMockDB(async allDbs => {
            allDbs.trip.create = () =>
                new Promise((resolve, reject) =>
                    resolve({
                        get: () => trip
                    })
                );
        });
        const res = await server.inject({
            method: 'POST',
            url: '/trip/start',
            payload
        });
        expect(res.statusCode).toEqual(200);
        const { result } = res;
        expect(result.id).toEqual(1);
        expect(result.rider_id).toEqual(1);
        expect(result.cab_id).toEqual(payload.cabId);
        expect(result.driver_id).toEqual(payload.driverId);
    });
});
