module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'location',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
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
            landmarkName: {
                field: 'landmark_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            zipCode: {
                field: 'zip_code',
                type: DataTypes.INTEGER(6),
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
            tableName: 'location',
            timestamps: false
        }
    );
};
