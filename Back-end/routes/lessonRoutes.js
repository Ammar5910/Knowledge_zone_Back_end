const express = require('express');
const { fetchLessons, modifyLesson } = require('../controllers/lessonController');

const router = express.Router();

router.get('/', fetchLessons);
router.put('/:id', modifyLesson);

module.exports = router;
