const express = require('express');
const studentRouter = express.Router();
const studentController = require('../controllers/studentController');

studentRouter.post('/createStudent', studentController.createStudent);
studentRouter.get('/getAllStudents', studentController.getAllStudents);
studentRouter.get('/getStudentById/:id', studentController.getStudentById);
studentRouter.patch('/updateStudent/:id', studentController.updateStudent);
studentRouter.delete('/removeStudent/:id', studentController.deleteStudent);

module.exports = studentRouter;
