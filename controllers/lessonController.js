const { getAllLessons, updateLesson, searchLessons } = require('../models/lessonModel');

const fetchLessons = async (req, res) => {
    try {
        const lessons = await getAllLessons();
        const lessonsWithImages = lessons.map((lesson) => ({
            ...lesson,
            imageUrl: lesson.name
                ? `${req.protocol}://${req.get("host")}/static/images/${lesson.name.toLowerCase()}.png`
                : null,
        }));

        res.json(lessonsWithImages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lessons' });
    }
};

const modifyLesson = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const result = await updateLesson(id, updateData);
        if (result.modifiedCount === 0) {
            res.status(404).json({ error: 'Lesson not found' });
        } else {
            res.json({ message: 'Lesson updated successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update lesson' });
    }
};

const search = async (req, res) => {
    const { q: searchTerm = "", sortBy, order } = req.query;

    try {
        const results = await searchLessons(
            searchTerm.trim() ? searchTerm : null,
            sortBy,
            order
        );

        const lessonsWithImages = results.map((lesson) => ({
            ...lesson,
            imageUrl: lesson.name
                ? `${req.protocol}://${req.get("host")}/static/images/${lesson.name.toLowerCase()}.png`
                : null,
        }));

        res.json(lessonsWithImages);
    } catch (error) {
        res.status(500).json({ error: "Failed to perform search" });
    }
};

module.exports = { fetchLessons, modifyLesson, search };
