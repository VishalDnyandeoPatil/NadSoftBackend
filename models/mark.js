module.exports = (sequelize, DataTypes) => {
    const Mark = sequelize.define('Marks', {
        studentId: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Students', 
                key: 'id' 
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        subject: { type: DataTypes.STRING, defaultValue: "" },
        score: { type: DataTypes.INTEGER, defaultValue: 0 }
    }
    , {
        tableName: 'Marks',
        timestamps: true
    });

    Mark.associate = (models) => {
        Mark.belongsTo(models.Students, {
            foreignKey: 'studentId',
            as: 'student',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    );
    };

    return Mark;
};
