module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'drivers',
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            oauthClientId: {
                field: 'oauth_client_id',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                field: 'name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            currentCabId: {
                field: 'current_cab_id',
                type: DataTypes.INTEGER(32),
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
            tableName: 'drivers',
            timestamps: false
        }
    );
};
