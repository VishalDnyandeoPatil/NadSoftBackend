
module.exports = (sequelize, Datatypes)=>{
    const Student = sequelize.define('Students',{
        firstName: { type: Datatypes.STRING, defaultValue: "" },
        lastName: { type: Datatypes.STRING, defaultValue: "" },
        age: { type: Datatypes.INTEGER, defaultValue: 0 },
        standard: { type: Datatypes.STRING, defaultValue: "" },
        division: { type: Datatypes.STRING, defaultValue: "" },
        // marks: { type: Datatypes.STRING, defaultValue: "" },
    },
    // {
    //     tableName: 'Students',
    //     timestamps: false
    // }
);

    // Student.associate = (models) => {
    //     Student.hasMany(models.Marks, {
    //         foreignKey: 'studentId',
    //         as: 'marks'
    //     });
    // };

    return Student
};