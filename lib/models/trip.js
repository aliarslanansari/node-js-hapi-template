module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'trip',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            riderId: {
                field: 'rider_id',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            driverId: {
                field: 'driver_id',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            cabId: {
                field: 'cab_id',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            startLocId: {
                field: 'start_loc_id',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            endtLocId: {
                field: 'end_loc_id',
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            tripStartTime: {
                field: 'trip_start_time',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            tripEndTime: {
                field: 'trip_end_time',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                field: 'updated_at',
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: 'trip',
            timestamps: false
        }
    );
};
