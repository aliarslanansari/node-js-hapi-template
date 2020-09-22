import { resetAndMockDB } from 'utils/testUtils';
import { mockData } from 'utils/mockData';

describe('user daos', () => {
    const { MOCK_USER: mockUser } = mockData;
    const attributes = [
        'id',
        'name',
        'email',
        'phone_no',
        'country',
        'gender',
        'dob'
    ];

    describe('findOneUser', () => {
        it('should find a user by ID', async () => {
            const { findOneUser } = require('daos/usersDao');
            const testUser = await findOneUser(1);
            expect(testUser.id).toEqual(1);
            expect(testUser.name).toEqual(mockUser.name);
            expect(testUser.country).toEqual(mockUser.country);
            expect(testUser.email).toEqual(mockUser.email);
        });
        it('should call findOne with the correct parameters', async () => {
            let spy;
            await resetAndMockDB(db => {
                spy = jest.spyOn(db.users, 'findOne');
            });
            const { findOneUser } = require('daos/usersDao');

            let userId = 1;
            await findOneUser(userId);
            expect(spy).toBeCalledWith({
                attributes,
                underscoredAll: false,
                where: {
                    id: userId
                }
            });

            jest.clearAllMocks();
            userId = 2;
            await findOneUser(userId);
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
