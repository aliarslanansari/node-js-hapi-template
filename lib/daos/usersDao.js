import { users } from 'models';
import { badRequest } from 'utils/responseInterceptors';
const attributes = [
    'id',
    'name',
    'email',
    'phone_no',
    'country',
    'gender',
    'dob'
];

export const findOneUser = async id =>
    users.findOne({
        attributes,
        where: {
            id
        },
        underscoredAll: false
    });

export const createUser = user => users.create(user, { raw: true });

export const updateUser = (user, id) => users.update(user, { where: { id } });

export const deleteUser = async id => {
    const user = await users.findOne({ where: { id } }).catch(err => err);
    if (!user) {
        return badRequest('No user found with ID:', id);
    }
    return user.destroy();
};
