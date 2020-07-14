const express = require('express');
const router = express.Router();

const dateStateController = require('../controllers/dateStateController');

// GET ALL
router.get('/date_state/list', dateStateController.getAll);

// GET WITH ID
router.get('/date_state/:id', dateStateController.getId);

// CREATE
router.post('/date_state', dateStateController.add);

// DELETE
router.delete('/date_state/:id', dateStateController.delete);

// UPDATE
router.put('/date_state', dateStateController.edit);

module.exports = router;
