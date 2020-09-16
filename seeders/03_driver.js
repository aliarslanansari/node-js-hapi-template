module.exports = {
    up: queryInterface => {
        const arr = [
            {
                name: 'aditya roy',
                current_cab_id: 1
            },
            {
                name: 'sidd puri',
                current_cab_id: 2
            }
        ];
        return queryInterface.bulkInsert('drivers', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('drivers', null, {})
};
