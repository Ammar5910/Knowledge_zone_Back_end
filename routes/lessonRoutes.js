// Import the Express framework
const express = require('express');

// Import the lesson controller functions
const { fetchLessons, modifyLesson, search } = require('../controllers/lessonController');

// Create a new Express router instance
const router = express.Router();

// Route to fetch all lessons
// Handles GET requests to the root path ("/")
router.get('/', fetchLessons);

// Route to modify a specific lesson
// Handles PUT requests to "/:id", where ":id" is the lesson's unique identifier
router.put('/:id', modifyLesson);

// Route to search for lessons based on query parameters
// Handles GET requests to "/search"
router.get('/search', search);

// Export the router to be used in the main application or other modules
module.exports = router;
