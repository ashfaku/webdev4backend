/*==================================================
/database/utils/seedDB.js

It seeds the database with several initial students and campuses.
==================================================*/
const { Campus, Student } = require('../models');  // Import database models

// Seed database
const seedDB = async () => {
	// Create a new campus
	const dummy_campus = await Campus.create({
		name: "Hunter College",
		address: "695 Park Ave, New York, NY 10065",
		description: "This is a school in New York, New York.",
		image_url: "https://www.usnews.com/object/image/0000016c-9bb3-d1ec-a97f-9bbbc5a90000/college-photo_22129.jpg"
	});
	// Create a new campus
	const dummy_campus2 = await Campus.create({
		name: "Queens College",
		address: "65-30 Kissena Blvd, Queens, NY 11367",
		description: "This is a school in Queens, New York.",
		image_url: "https://www.usnews.com/object/image/0000018f-351f-d835-a5af-3fdfecae0000/eckharthall.jpeg"
	});
	// Create a new campus
	const dummy_campus3 = await Campus.create({
		name: "Brooklyn College",
		address: "2900 Bedford Ave, Brooklyn, NY 11210",
		description: "This is a school in Brooklyn, New York.",
		image_url: "https://www.usnews.com/object/image/00000187-c7ff-d1a9-ada7-f7ffa3b50000/20200519-mo-8042.jpg"
	});
	
	// Create a new student for a campus
	const dummy_student = await Student.create({
		firstname: "Joe",
		lastname: "Smith",
		gpa: 1.1,
		email: "one@gmail.com",
		image_url: "https://www.usnews.com/object/image/00000190-7475-d030-a1bb-f675280d0000/https-media-gettyimages-com-id-2063480448-photo-face-black-woman-and-college-student-on-computer-with-smile-for-research-study-and.jpg"
	});
	// Create a new student for a campus
	const dummy_student2 = await Student.create({
		firstname: "Mary",
		lastname: "Johnson",
		gpa: 2.2,
		email: "two@gmail.com",
		image_url: "https://dims.apnews.com/dims4/default/a4ae11b/2147483647/strip/true/crop/3000x1999+0+0/resize/599x399!/quality/90/?url=https%3A%2F%2Fstorage.googleapis.com%2Fafs-prod%2Fmedia%2F6d05e9bd6a1d4e0582b6db3d6196756e%2F3000.jpeg"
	});

	// Add students to campuses
	await dummy_student.setCampus(dummy_campus);
	await dummy_student2.setCampus(dummy_campus2);
}

// Export the database seeding function
module.exports = seedDB;