// import { badRequest } from '@hapi/boom';
import { users } from 'models';
// import {
//     transformDbArrayResponseToRawResponse,
//     convertDbResponseToRawResponse
// } from 'utils/transformerUtils';

const attributes = [
    'id',
    'name',
    'email',
    'phone_no',
    'country',
    'gender',
    'dob'
];

export const findOneUser = async condition =>
    users.findOne({
        attributes,
        where: {
            ...condition
        },
        underscoredAll: false
    });

export const createUser = user => users.create(user, { raw: true });

export const loginUser = async user => {};
