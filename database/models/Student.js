/*==================================================
/database/models/Student.js

It defines the student model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

const Student = db.define("student", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  campusId: {
    type: Sequelize.INTEGER,
    allowNull: true,  
    references: {
      model: 'campuses', 
      key: 'id'
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true
  },
  gpa: {
    type: Sequelize.DOUBLE,
    allowNull: true
  }
});

// Export the student model
module.exports = Student;