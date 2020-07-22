/*
 *  Copyright (C) 2020 ThePringaos
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
