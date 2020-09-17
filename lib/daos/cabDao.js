import { badRequest } from '@hapi/boom';
import { cabs } from 'models';
import {
    transformDbArrayResponseToRawResponse,
    convertDbResponseToRawResponse
} from 'utils/transformerUtils';
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

export const findCab = async condition =>
    cabs.findOne({
        attributes,
        where: {
            ...condition
        },
        underscoredAll: false
    });

export const createCab = async cabData => {
    try {
        const { regNo } = cabData;
        if (await findCab({ regNo })) {
            return badRequest('This cab is already assigned to a driver');
        }
        const dbRes = convertDbResponseToRawResponse(
            await cabs.create(cabData, { raw: true })
        );
        return dbRes;
    } catch (e) {
        return badRequest(e.message);
    }
};

export const findAllCab = async () => {
    const where = {};
    const allCabs = transformDbArrayResponseToRawResponse(
        await cabs.findAll({
            attributes,
            where
        })
    );
    return allCabs;
};
