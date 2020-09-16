module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'cab',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            regNo: {
                field: 'reg_no',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            brand: {
                field: 'brand',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            model: {
                field: 'model',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            cabType: {
                field: 'cab_type',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            baseRate: {
                field: 'base_rate',
                type: DataTypes.FLOAT(5),
                allowNull: false
            },
            latitude: {
                field: 'latitude',
                type: DataTypes.FLOAT(32),
                allowNull: false
            },
            longitude: {
                field: 'longitude',
                type: DataTypes.FLOAT(32),
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
            tableName: 'cab',
            timestamps: false
        }
    );
};
