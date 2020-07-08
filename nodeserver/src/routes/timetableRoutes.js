const express = require('express');
const router = express.Router();

const timetableController = require('../controllers/timetableController');

// GET ALL
router.get('/timetable/list', timetableController.getAll);

// GET WITH ID
router.get('/timetable/:id', timetableController.getId);

// CREATE
router.post('/timetable', timetableController.add);

// DELETE
router.delete('/timetable/:id', timetableController.delete);

// UPDATE
router.put('/timetable', timetableController.edit);

module.exports = router;
