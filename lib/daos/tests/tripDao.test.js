import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

describe('trip daos', () => {
    const { MOCK_TRIP: mockTrip } = mockData;
    const attributes = [
        'id',
        'rider_id',
        'driver_id',
        'cab_id',
        'start_loc_id',
        'end_loc_id',
        'trip_start_time',
        'trip_end_time'
    ];

    describe('findOneTrip', () => {
        it('should find a trip by ID', async () => {
            const { findOneTrip } = require('daos/tripDao');
            const testTrip = await findOneTrip(1);
            expect(testTrip.id).toEqual(1);
            expect(testTrip.riderId).toEqual(mockTrip.riderId);
            expect(testTrip.driverId).toEqual(mockTrip.driverId);
            expect(testTrip.cabId).toEqual(mockTrip.cabId);
            expect(testTrip.startLocId).toEqual(mockTrip.startLocId);
            expect(testTrip.endLocId).toEqual(mockTrip.endLocId);
            expect(testTrip.tripStartTime).toEqual(mockTrip.tripStartTime);
            expect(testTrip.tripEndTime).toEqual(mockTrip.tripEndTime);
        });
        it('should call findOne with the correct parameters', async () => {
            let spy;
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.trip, 'findOne');
            });
            const { findOneTrip } = require('daos/tripDao');

            let userId = 1;
            await findOneTrip({ id: userId });
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    id: userId
                }
            });

            jest.clearAllMocks();
            userId = 2;
            await findOneTrip({ id: userId });
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    id: userId
                }
            });
        });
    });
});
