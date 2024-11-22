const express = require('express');
const { fetchLessons, modifyLesson, search } = require('../controllers/lessonController');

const router = express.Router();

router.get('/', fetchLessons);
router.put('/:id', modifyLesson);
router.get('/search', search);

module.exports = router;
