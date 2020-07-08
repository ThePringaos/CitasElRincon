const express = require('express');
const router = express.Router();

const dateTypeController = require('../controllers/dateTypeController');

// GET ALL
router.get('/date_type/list', dateTypeController.getAll);

// GET WITH ID
router.get('/date_type/:id', dateTypeController.getId);

// CREATE
router.post('/date_type', dateTypeController.add);

// DELETE
router.delete('/date_type/:id', dateTypeController.delete);

// UPDATE
router.put('/date_type', dateTypeController.edit);

module.exports = router;
