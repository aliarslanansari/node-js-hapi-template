import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

describe('user daos', () => {
    const { MOCK_CAB: mockCab } = mockData;
    const attributes = [
        'id',
        'reg_no',
        'brand',
        'model',
        'cab_type',
        'base_rate',
        'latitude',
        'longitude'
    ];

    describe('findCab', () => {
        it('should find a user by ID', async () => {
            const { findCab } = require('daos/cabDao');
            const testCab = await findCab({ id: 1 });
            expect(testCab.id).toEqual(1);
            expect(testCab.regNo).toEqual(mockCab.regNo);
            expect(testCab.brand).toEqual(mockCab.brand);
            expect(testCab.cabType).toEqual(mockCab.cabType);
            expect(testCab.baseRate).toEqual(mockCab.baseRate);
            expect(testCab.latitute).toEqual(mockCab.latitute);
            expect(testCab.longitude).toEqual(mockCab.longitude);
        });
        it('should call findOne with the correct parameters', async () => {
            jest.resetModules();
            jest.clearAllMocks();
            let spy;
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.cabs, 'findOne');
            });
            const { findCab } = require('daos/cabDao');

            let id = 1;
            await findCab({ id });
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    id
                }
            });

            jest.clearAllMocks();
            id = 2;
            await findCab({ id });
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    id
                }
            });
        });
    });

    describe('findAllCab ', () => {
        let spy;
        const where = {};

        it('should find all the users', async () => {
            const { findAllCab } = require('daos/cabDao');
            const allCabs = await findAllCab();
            const firstCab = allCabs[0];
            expect(firstCab.id).toEqual(1);
            expect(firstCab.reg_no).toEqual(mockCab.regNo);
            expect(firstCab.brand).toEqual(mockCab.brand);
            expect(firstCab.model).toEqual(mockCab.model);
        });

        it('should call findAll with the correct parameters', async () => {
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.cabs, 'findAll');
            });
            const { findAllCab } = require('daos/cabDao');
            await findAllCab();
            expect(spy).toBeCalledWith({
                attributes,
                where
            });
        });
    });
});
