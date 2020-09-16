module.exports = {
    up: queryInterface => {
        const arr = [
            {
                rider_id: 1,
                driver_id: 1,
                cab_id: 1,
                start_loc_id: 1,
                end_loc_id: 2,
                trip_start_time: '2020-09-14 05:00:06',
                trip_end_time: '2020-09-14 05:40:06'
            },
            {
                rider_id: 2,
                driver_id: 2,
                cab_id: 2,
                start_loc_id: 2,
                end_loc_id: 1,
                trip_start_time: '2020-09-15 12:00:06',
                trip_end_time: '2020-09-15 13:40:06'
            }
        ];
        return queryInterface.bulkInsert('trip', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('trip', null, {})
};
