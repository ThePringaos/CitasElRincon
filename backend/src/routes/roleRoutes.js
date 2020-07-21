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

const roleController = require('../controllers/roleController');

// GET ALL
router.get('/role/list', roleController.getAll);

// GET WITH ID
router.get('/role/:id', roleController.getId);

// CREATE
router.post('/role', roleController.add);

// DELETE
router.delete('/role/:id', roleController.delete);

// UPDATE
router.put('/role', roleController.edit);

module.exports = router;
