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
