const express = require('express');
const router = express.Router();

const imageController = require('../controllers/imageController');

// GET ALL
router.get('/image/list', imageController.getAll);

// GET WITH ID
router.get('/image/:id', imageController.getId);

// CREATE
router.post('/image', imageController.add);

// DELETE
router.delete('/image/:id', imageController.delete);

module.exports = router;
