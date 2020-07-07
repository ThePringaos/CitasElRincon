const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/departmentController');

// GET ALL
router.get('/department/list', departmentController.getAll);

// GET WITH ID
router.get('/department/:id', departmentController.getId);

// CREATE
router.post('/department', departmentController.add);

// DELETE
router.delete('/department/:id', departmentController.delete);

// UPDATE
router.put('/department', departmentController.edit);

module.exports = router;
