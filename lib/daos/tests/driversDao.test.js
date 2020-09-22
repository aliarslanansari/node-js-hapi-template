import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

describe('driver daos', () => {
    const { MOCK_DRIVER: mockDriver } = mockData;
    const attributes = ['id', 'name', 'current_cab_id'];

    describe('findOneDriver', () => {
        it('should find a user by ID', async () => {
            const { findOneDriver } = require('daos/driversDao');
            const testDriver = await findOneDriver({ id: 1 });
            expect(testDriver.id).toEqual(1);
            expect(testDriver.name).toEqual(mockDriver.name);
            expect(testDriver.currentCabId).toEqual(mockDriver.currentCabId);
        });

        it('should call findOne with the correct parameters', async () => {
            jest.resetModules();
            jest.clearAllMocks();
            let spy;
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.drivers, 'findOne');
            });
            const { findOneDriver } = require('daos/driversDao');

            let id = 1;
            const res = await findOneDriver({ id });
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    id
                }
            });

            jest.clearAllMocks();
            id = 2;
            await findOneDriver({ id });
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    id
                }
            });
        });
    });
});
