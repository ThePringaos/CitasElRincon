const express = require('express');
const router = express.Router();

const tutorController = require('../controllers/tutorController');

// GET ALL
router.get('/tutor/list', tutorController.getAll);

// GET WITH ID
router.get('/tutor/:id', tutorController.getId);

// CREATE
router.post('/tutor', tutorController.add);

// DELETE
router.delete('/tutor/:id', tutorController.delete);

// UPDATE
router.put('/tutor', tutorController.edit);

module.exports = router;
