module.exports = {
    up: queryInterface => {
        const arr = [
            {
                latitude: 18.4676,
                longitude: 73.901931,
                landmark_name: 'wednesday sol',
                zip_code: 411001
            },
            {
                latitude: 18.480029,
                longitude: 73.804488,
                landmark_name: 'Warje Bridge',
                zip_code: 411001
            }
        ];
        return queryInterface.bulkInsert('location', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('location', null, {})
};
