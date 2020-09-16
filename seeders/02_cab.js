module.exports = {
    up: queryInterface => {
        const arr = [
            {
                reg_no: 'MH-12-EX-9678',
                brand: 'toyota',
                model: 'yaris',
                cab_type: 'suv',
                base_rate: '549',
                latitude: 18.4676,
                longitude: 73.901931
            },
            {
                reg_no: 'MH-12-NB-7896',
                brand: 'Hyundai',
                model: 'Xcent',
                cab_type: 'prime',
                base_rate: '399',
                latitude: 18.480029,
                longitude: 73.804488
            }
        ];
        return queryInterface.bulkInsert('cab', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('cab', null, {})
};
