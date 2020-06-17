const express = require('express');
const router = express.Router();

const professionalController = require('../controllers/professionalController');


//GET ALL
router.get('/professional/list', professionalController.getAll);

//GET WITH ID
router.get('/professional/:id',professionalController.getId);

//GET WITH EMAIL
router.post('/professional-email',professionalController.getWithEmail);

//CREATE
router.post('/professional', professionalController.add);

//DELETE
router.delete('/professional/:id', professionalController.delete);

//UPDATE 
router.put('/professional',professionalController.edit);

module.exports=router;