/*==================================================
/routes/students.js

It defines all the students-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL STUDENTS: async/await using "try-catch" */
// router.get('/', async (req, res, next) => {
//   try {
//     let students = await Student.findAll({include: [Campus]});
//     res.status(200).json(students);
//   } 
//   catch(err) {
//     next(err);
//   }
// });

/* GET ALL STUDENTS: async/await using express-async-handler (ash) */
// Automatically catches any error and sends to Routing Error-Handling Middleware (app.js)
// It is the same as using "try-catch" and calling next(error)
router.get('/', ash(async(req, res) => {
  let students = await Student.findAll({include: [Campus]});
  res.status(200).json(students);  // Status code 200 OK - request succeeded
}));

/* GET STUDENT BY ID */
router.get('/:id', ash(async(req, res) => {
  // Find student by Primary Key
  let student = await Student.findByPk(req.params.id, {include: [Campus]});  // Get the student and its associated campus
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.status(200).json(student);  // Status code 200 OK - request succeeded
}));

/* ADD NEW STUDENT */
router.post('/', function(req, res, next) {
  Campus.findByPk(req.body.campusId)
    .then(campus => {
      console.log("BODY: ", req.body);
      console.log("CAMPUS: ", campus);

      const studentData = { ...req.body }; 

      if (!campus) { // checking if the inputted campus id didn't correlate to a campus id
        delete studentData.campusId;
      }

      Student.create(studentData)
        .then(createdStudent => res.status(200).json(createdStudent))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});


/* DELETE STUDENT */
router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a student!"))
    .catch(err => next(err));
});

/* EDIT STUDENT */
router.put('/:id', ash(async (req, res) => {

  const campus = await Campus.findByPk(req.body.campusId);
  if (!campus) {
    req.body.campusId = null;  
  }
  await Student.update(req.body, { where: { id: req.params.id } });
  const student = await Student.findByPk(req.params.id);
  res.status(200).json(student);  // 200 OK is better for update
}));


// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;