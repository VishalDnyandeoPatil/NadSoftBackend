const db = require('../models') ;

module.exports = (sequelize, DataTypes) => {
    const Mark = sequelize.define('Marks', {
        studentId: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Students', // Name of the target table
                key: 'id' // Key in the target table
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        subject: { type: DataTypes.STRING, defaultValue: "" },
        score: { type: DataTypes.INTEGER, defaultValue: 0 }
    }
    // , {
    //     tableName: 'Marks',
    //     timestamps: false
    // });

    // Mark.associate = (db) => {
    //     Mark.belongsTo(db.Students, {
    //         foreignKey: 'studentId',
    //         as: 'student'
    //     }
    );
    // };

    return Mark;
};
