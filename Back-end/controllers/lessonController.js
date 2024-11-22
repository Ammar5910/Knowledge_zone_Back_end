const { getAllLessons, updateLesson } = require('../models/lessonModel');

const fetchLessons = async (req, res) => {
    try {
        const lessons = await getAllLessons();
        res.json(lessons);
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

module.exports = { fetchLessons, modifyLesson };
