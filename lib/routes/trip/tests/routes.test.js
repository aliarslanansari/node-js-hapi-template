/* global server */
import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

const { MOCK_TRIP: trip } = mockData;

const payload = {
    rider_id: trip.riderId,
    driver_id: trip.driverId,
    cab_id: trip.cabId,
    start_loc_id: trip.startLocId,
    end_loc_id: trip.endLocId,
    trip_start_time: trip.tripStartTime,
    trip_end_time: trip.tripEndTime
};

describe('/trips route tests ', () => {
    let server;
    // beforeEach(async () => {
    //     server = await resetAndMockDB(async allDbs => {
    //         allDbs.trip.$queryInterface.$useHandler(function(query) {
    //             if (query === 'findById') {
    //                 return trip;
    //             }
    //         });
    //         allDbs.trip.create = () =>
    //             new Promise((resolve, reject) => resolve(trip));
    //     });
    // });
    it('should return 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/trip/1'
        });
        expect(res.statusCode).toEqual(200);
    });

    it.only('should return 404', async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.resetModules();
        const server = await resetAndMockDB(async allDbs => {
            allDbs.trip.$queryInterface.$useHandler(function(query) {
                if (query === 'findById') {
                    return null;
                }
            });
        });

        const res = await server.inject({
            method: 'GET',
            url: '/trip/2'
        });
        console.log(res);
        expect(res.statusCode).toEqual(404);
        expect(res.result.message).toEqual('No trip was found for id 2');
    });

    it('should create a trip with the provided details', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/trip',
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
