import { badRequest } from '@hapi/boom';
import { drivers } from 'models';
import { convertDbResponseToRawResponse } from 'utils/transformerUtils';

const attributes = ['id', 'name', 'current_cab_id'];

export const findOneDriver = async condition =>
    drivers.findOne({
        attributes,
        where: {
            ...condition
        },
        underscoredAll: false
    });

export const createDriver = async driver => {
    try {
        const { currentCabId } = driver;
        if (await findOneDriver({ currentCabId })) {
            return badRequest('This cab is already assigned to a driver');
        }
        const dbRes = convertDbResponseToRawResponse(
            await drivers.create(driver, { raw: true })
        );
        return dbRes;
    } catch (e) {
        return badRequest(e.message);
    }
};
