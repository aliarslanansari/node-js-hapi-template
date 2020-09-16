module.exports = {
    up: queryInterface => {
        const arr = [
            {
                name: 'Sharan',
                email: 'sharan@wednesday.is',
                phone_no: 9876543210,
                country: 'india',
                gender: 'male',
                dob: '1990-06-22'
            },
            {
                name: 'mac',
                email: 'mac@wednesday.is',
                phone_no: 9876543211,
                country: 'india',
                gender: 'male',
                dob: '1985-06-22'
            }
        ];
        return queryInterface.bulkInsert('users', arr, {});
    },
    down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
