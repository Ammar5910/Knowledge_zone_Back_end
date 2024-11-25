// Import necessary functions from the lesson model
const { getAllLessons, updateLesson, searchLessons } = require('../models/lessonModel');

// Controller to fetch all lessons
const fetchLessons = async (req, res) => {
    try {
        // Retrieve all lessons using the model function
        const lessons = await getAllLessons();

        // Add an imageUrl property to each lesson for dynamic image generation
        const lessonsWithImages = lessons.map((lesson) => ({
            ...lesson,
            imageUrl: lesson.name
                ? `${req.protocol}://${req.get("host")}/static/images/${lesson.name.toLowerCase()}.png` // Construct the image URL based on lesson name
                : null, // If the lesson name is missing, set imageUrl to null
        }));

        // Respond with the lessons including their image URLs
        res.json(lessonsWithImages);
    } catch (error) {
        // Handle errors and send a 500 response with an error message
        res.status(500).json({ error: 'Failed to fetch lessons' });
    }
};

// Controller to update a lesson
const modifyLesson = async (req, res) => {
    const { id } = req.params; // Extract the lesson ID from the route parameters
    const updateData = req.body; // Extract the data to update from the request body

    try {
        // Attempt to update the lesson in the database
        const result = await updateLesson(id, updateData);

        // Check if the lesson was found and updated
        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'Lesson not found' }); // Send a 404 response if no lesson was updated
        } else {
            res.json({ message: 'Lesson updated successfully' }); // Send a success message
        }
    } catch (error) {
        // Handle errors and send a 500 response with an error message
        res.status(500).json({ error: 'Failed to update lesson' });
    }
};

// Controller to search for lessons
const search = async (req, res) => {
    const { q: searchTerm = "", sortBy, order } = req.query; // Extract search parameters from the query string

    try {
        // Perform a search based on the search term, sorting, and ordering
        const results = await searchLessons(
            searchTerm.trim() ? searchTerm : null, // Trim the search term and ensure it's non-empty
            sortBy, // Sorting field
            order // Sorting order (e.g., ascending or descending)
        );

        // Add an imageUrl property to each lesson for dynamic image generation
        const lessonsWithImages = results.map((lesson) => ({
            ...lesson,
            imageUrl: lesson.name
                ? `${req.protocol}://${req.get("host")}/static/images/${lesson.name.toLowerCase()}.png` // Construct the image URL based on lesson name
                : null, // If the lesson name is missing, set imageUrl to null
        }));

        // Respond with the search results including their image URLs
        res.json(lessonsWithImages);
    } catch (error) {
        // Handle errors and send a 500 response with an error message
        res.status(500).json({ error: "Failed to perform search" });
    }
};

// Export the controllers for use in other parts of the application
module.exports = { fetchLessons, modifyLesson, search };  
