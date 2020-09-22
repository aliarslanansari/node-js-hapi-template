import { badRequest } from '@hapi/boom';
import { trip } from 'models';
import {
    transformDbArrayResponseToRawResponse,
    convertDbResponseToRawResponse
} from 'utils/transformerUtils';
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

export const findOneTrip = async id =>
    trip.findOne({
        attributes,
        where: {
            id
        },
        underscoredAll: false
    });

export const createTripStart = async tripData => {
    try {
        const { startLocId, endLocId } = tripData;
        if (startLocId === endLocId) {
            return badRequest('Start and End Location can not be same');
        }
        const dbRes = convertDbResponseToRawResponse(
            await trip.create(tripData, { raw: true })
        );
        return dbRes;
    } catch (e) {
        return badRequest(e.message);
    }
};

export const findUsersTrips = async riderId => {
    const where = { riderId };
    const totalCount = await trip.count({ where });
    const trips = transformDbArrayResponseToRawResponse(
        await trip.findAll({
            attributes,
            where
        })
    );
    return { trips, totalCount };
};

export const updateTripEnd = async ({ tripEndTime, id }) =>
    trip.update(
        {
            tripEndTime
        },
        {
            where: { id }
        }
    );
