/*
 *  Copyright (C) 2020  Unknown
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

const dateController = require('../controllers/dateController');
 

// GET ALL
router.get('/date/list', dateController.getAll);

// GET WITH ID
router.get('/date/:id', dateController.getId);

// OBTAIN DATES WITH PROF ID
router.post('/date/get-date', dateController.getDate);

// CREATE
router.post('/date', dateController.add);

// DELETE
router.delete('/date/:id', dateController.delete);

// UPDATE
router.put('/date', dateController.edit);

module.exports = router;
