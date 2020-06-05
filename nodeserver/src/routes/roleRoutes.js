const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');


//GET ALL
router.get('/role/list', roleController.getAll);

//GET WITH ID
router.get('/role/:id',roleController.getId);

//CREATE
router.post('/role', roleController.add);

//DELETE
router.delete('/role/:id', roleController.delete);

//UPDATE 
router.put('/role',roleController.edit);

module.exports=router;