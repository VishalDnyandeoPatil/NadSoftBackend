const db = require('../models') ;

const createStudent = async (req, res) => {
  try {
    let { firstName, lastName, age, standard, division, marks }  = req.body;
    // let student = await db.Student.create(studentData);

    let student = await db.Students.create({
        firstName, lastName, age, standard, division
    })

    // console.log("This is the studentData", student)

    if (marks && marks.length > 0) {
        const marksData = marks.map(mark => ({
            studentId: student.id, // Utilizing the foreign key
            subject: mark.subject,
            score: mark.score
        }));

        let studentMarksData = await db.Marks.bulkCreate(marksData);

        // console.log("Student Marks Data", studentMarksData);

    }

    let studentWithMarks = await db.Students.findOne(
      {
        where:{
          id: student.id
        },
        include:[{model:db.Marks, as:'marks'}]
      }
    );

    // console.log("Student with marks", studentWithMarks)

    res.status(201).json(studentWithMarks);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let recordsPerPage = parseInt(req.query.limit) || 10;
    let offset = (page-1)* recordsPerPage;

    // const { rows, count } = await Student.findAndCountAll({
    //   include: [{ model: Mark }],
    //   limit: parseInt(limit),
    //   offset: parseInt(offset),
    // });

    let getAllStudentData = await db.Students.findAll({
            limit : recordsPerPage,
            offset : offset,
            include: [{ model: db.Marks, as: 'marks' }], 
        })
    
    let getAllStudentCount  = await db.Students.count();

    let totalPage = Math.ceil(getAllStudentCount/recordsPerPage)

    return res.status(200).json({
            getAllStudentCount,
            getAllStudentData,
            pagination:{
              totalPage,
              currentPage: page,
              pageSize: recordsPerPage
            }
    })

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

const getStudentById = async (req, res) => {
  try {

    let studentId = req.params.id;

    let studentData = await db.Students.findByPk(studentId, {
      include: [{ model: db.Marks, as: 'marks' }],
    });

    if (!studentData){
        return res.status(404).json({ message: 'Student data not found' });
    } 

    return res.status(200).json(studentData);

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

const updateStudent = async (req, res) => {
  try {

    let studentId = req.params.id;

    let studentData = await db.Students.findByPk(studentId, {
      include: [{ model: db.Marks, as: 'marks' }],
    });

    if(!studentData){
        return res.status(404).json({error:"Student data not found"})
    }

    // let newStudentData = req.body;
    let { firstName, lastName, age, standard, division, marks } = req.body;

    // let updatedStudentData = {...studentData, ...newStudentData}

    let newUpdatedStudentData = await db.Students.update( 
      { firstName, lastName, age, standard, division}, {
        where:{
            id : studentId
        }
    } )

    if(marks && marks.length>0){
      for(let mark of marks){
        let existingMarks = await db.Marks.findOne({
          where:{ studentId,
            subject: mark.subject
          },
        });

        if(existingMarks){
          let updateScore = await db.Marks.update(
            { score: mark.score },
            { where: {id:existingMarks.id}}
          );
        }
        else{
          let createMarksData = await db.Marks.create({
            studentId,
            subject: mark.subject,
            score: mark.score
          });
        }
      }
    }

    let updatedStudentsData = await db.Students.findByPk(studentId,{
      include: [{ model: db.Marks, as: 'marks' }],
    });

    // const [updated] = await db.Student.update(updatedData, { where: { id: studentId  } });
    // if (!updated) return res.status(404).json({ message: 'Student not found' });
    // res.json({ message: 'Student updated successfully' });

    // return res.status(200).json({newUpdatedStudentData});
    return res.status(200).json({updatedStudentsData});

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};

const deleteStudent = async (req, res) => {
  try {

    let studentId = req.params.id ; 

    let removeMarksData = await db.Marks.destroy({where: {studentId}})

    let removeStudentData = await db.Students.destroy({
        where:{
            id:studentId
        }
    });

    if(removeStudentData === 0){
        return res.status(404).json({error: "Student data not found"})
    }

    return res.status(200).json({ message: "Student data deleted successfully" });

    // const deleted = await Student.destroy({ where: { id: req.params.id } });
    // if (!deleted) return res.status(404).json({ message: 'Student not found' });
    // res.json({ message: 'Student deleted successfully' });
  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

module.exports={
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}